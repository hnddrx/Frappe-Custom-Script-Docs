
frappe.ui.form.on('Official Business Application', {
    async refresh(frm) {
        //TODO: Get the last approver 
        removeCancelForNotLastApprovers(frm)
        

  },
  transport_type(frm){
    
    if(frm.doc.transport_type == 'With vehicle'){
        if(frm.doc.__unsaved == 1){
            console.log('Removed')
            frm.doc.transport_info[0].employee = '';
        }
    }
  },
	before_save(frm) {
        console.log('Block OB')
		blockOB(frm)
	}, from_date(frm){
	    //blockOB()
	}, async before_workflow_action(frm){
        await blockNotApprover(frm) 
    },
    
})

//TODO: Get employee approver function
async function employeeApprovers(frm){
   let approverData =  await frappe.db.get_list('Employee Approvers', {
        parent: 'Employee',
        filters: { "parent": frm.doc.employee, "application" : frm.doc.doctype },
        fields: ['*'],
        limit: 100000
    })
    return approverData
}

//TODO: Get current logged in user
async function getCurrentLoggedUser(frm){
    const currentUser = frappe.session.user; //NOTE: Get current logged in email/user_id
    let loggedUser = await frappe.db.get_value('Employee', { 'user_id': currentUser }, 'employee_id'); //NOTE: current logged in user
    return loggedUser
}

//TODO: Remove cancel for not last approvers
async function removeCancelForNotLastApprovers(frm) {
    const employeeApprover = await employeeApprovers(frm); //NOTE: Get approvers
    const currentLoggedUser = (await getCurrentLoggedUser(frm)).message.employee_id; //NOTE: Get current Logged in employee
    const uniqueLevels = [...new Set(employeeApprover.map(data => data.level))]; //NOTE set unique levels
    const lastLevel = uniqueLevels[uniqueLevels.length - 1];// NOTE: get last element/approver
    let lastApprover = employeeApprover.filter(filters => filters.level === lastLevel).map(data => data.approver)//NOTE: map approver

    const isLastApprover = currentLoggedUser === lastApprover.toString() //NOTE: check if current logged user is the last approver of the application
    //console.log(isLastApprover)

    frm.doc.workflow_state === 'Approved' 
    ?//NOTE: if workflow state is Approved
        $(`.btn.btn-primary.btn-sm.dropdown-toggle`)[isLastApprover ? 'show' : 'hide']() //NOTE: show if isLastApprover is true else hide
    ://NOTE: Else show button
        $(`.btn.btn-primary.btn-sm.dropdown-toggle`).show()
    
}


//TODO: Block approval/reject if not yet or not approver
async function blockNotApprover(frm) {
    //NOTE: All approval levels
    const approvalMap = {
        "Pending": 1,
        "For 2nd Approval": 2,
        "For 3rd Approval": 3,
        "For 4th Approval": 4,
        "For 5th Approval": 5,
        "For 6th Approval": 6,
        "For 7th Approval": 7,
        "For 8th Approval": 8,
    };
    
    //console.log(frm.selected_workflow_action === "Reject")
    //TODO: If current workflow_state is in approvalMap and if selected workflow action is Approve or For Final approval
    if (frm.doc.workflow_state in approvalMap && (frm.selected_workflow_action === "Approve" || frm.selected_workflow_action === "For Final-Approval" || frm.selected_workflow_action === "Reject" )) {
        const currentUser = frappe.session.user; //NOTE: Get current logged in email/user_id
        const level = approvalMap[frm.doc.workflow_state]; //NOTE: Get level of approver that is allowed to approve the application
      
        let employeeApprover = await employeeApprovers(frm)
        //console.log(employeeApprover)
        const currentLoggedInUser = await getCurrentLoggedUser(frm) //Get current logged in user employee_id
        //TODO: If current logged in user is not Administrator
        if (currentUser !== 'Administrator') {
            //NOTE: Filters the approver by application and level based on the workflow state 
            const filteredApprovers =  employeeApprover.filter(approver => approver.level === level.toString());
            
            const employeeLevelApprover = filteredApprovers.map(data => data.approver_name); //NOTE: Return apprver name
            const employeeLevelID = filteredApprovers.map(data => data.approver); //NOTE: Return approver id
            //TODO: If employeeID list not includes current logged in user then block the application 
            if (!employeeLevelID.includes(currentLoggedInUser.message.employee_id)) {
                const errorMessage = `<b>You cannot Approve or Reject the application.</b> <hr><span style="opacity:0.5; ">Approver: ${employeeLevelApprover.join(', ')}</span>`;
                frappe.validated = false;
                await frappe.throw({
                    title: __('Notice!'),
                    indicator: 'orange',
                    message: __(errorMessage)
                });
            }
        }
        
    }
}


async function blockOB(frm){

    console.log('Block OB')
    let currentDate = frm.doc.posting_date;

    // Calculate dates
    let dateAfterOneDay = frappe.datetime.add_days(currentDate, 1);
    let dateAfterThreeDays = frappe.datetime.add_days(currentDate, 3);

    // Validate based on transport type
    if(cur_frm.doc.transport_type === 'Without vehicle' && cur_frm.doc.from_date < dateAfterOneDay){
        frappe.validated = false
        frappe.throw('The From Date should be at least 1 day after the Posting Date.');
    } else if(cur_frm.doc.transport_type === 'With vehicle' && cur_frm.doc.from_date < dateAfterThreeDays){
        frappe.validated = false
        frappe.throw('The From Date should be at least 3 days after the Posting Date.');
    }
    else{
        return;
    }
}

frappe.ui.form.on('With Vehicle Table', {
	refresh(frm) {
        //console.log('This')
        if(frm.doc.__unsaved === 1){
           // console.log('1')
            cur_frm.doc.transport_info = ""
        }
	}
})