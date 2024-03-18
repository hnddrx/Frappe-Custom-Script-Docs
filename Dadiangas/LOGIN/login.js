let spacer = document.querySelector('.page_content');

const spacerHtml = `
<div style="justify-content: center; padding:5%;">
<div style=" width:100px;"></div>
</div>
`;

if (spacer) {
    spacer.insertAdjacentHTML('afterbegin', spacerHtml);
}

let pageLogin = document.querySelector('.page_content');

const html = `
<div>
<div style="justify-content: center; padding:5%; position:absolute; left:-5.5%; top:-2%;">
<div class="body" style="text-align:center;  width:320px;">
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541228/DGCD2_-_transparent_fu9089.png" alt="Logo" style="margin: auto; width: 160px;"/>
    <div class="logos" style=" margin-top: 30px; flex-flow: row wrap;">
        <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541230/VERTICAL_oxu2o4.png" alt="all logo"  style="margin: auto; width: 130px;" />
        <!-- Add other images here -->
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541229/SOD_pn6m6p.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541228/HSDP_izphcq.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541227/AVIOR_iskqus.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541227/HopeLumber_gqdmhx.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541227/Buildmore_jgtbms.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541227/GORILLA_rxvvlk.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541228/DGCD_as715l.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541228/DCC_nx8hqw.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541229/BONAVIDA_fs61j8.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541228/EJ_YOMON_ivj2ii.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541228/Evergreen_a3v52e.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541229/MJ_CARGO_g1wvmt.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541230/SPP_ihtuop.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541230/SUDS_foqxqm.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541230/Swift_isvnxq.png" alt="all logo" style="margin: auto; width: 130px;" />
    <img src="https://res.cloudinary.com/dp9lw4lwo/image/upload/v1709541230/Steller_Logo_uuclre.png" alt="all logo" style="margin: auto; width: 130px;" />
    </div>
    <div style="text-align:center; border:1px solid red; width:auto; justify-content:center;">
    <div style="display:flex; margin-right:70px;">
        <a href="#" class="fa fa-facebook"></a>
        <a href="#" class="fa fa-twitter"></a>
        <a href="#" class="fa fa-instagram"></a>
    </div>
    <p>Copyright | DGCD Payroll</p>
</div>
</div>
</div>
</div>

`;

if (pageLogin) {
    pageLogin.insertAdjacentHTML('afterbegin', html);
}





// Define image URLs
const images = [
    'https://osi-test.in:31940/files/UntitledProject3-ezgif.com-video-to-gif-converter.gif'
    ];

// Preload images
images.forEach(image => {
  const img = new Image();
  img.src = image.slice(4, -2); // Extract URL from the "url()" format
});

// Select elements by class name once
const elements = document.getElementsByClassName('page-card-head');


// Define company data
const companyData = [
  {
    name: 'Sign In',
    description: 'Please enter your login information. ',
  }
];

// Initialize index for tracking current image
let currentIndex = 0;

// Function to change background image
function changeBackgroundImage() {
  // Get body element
  const body = document.body;
  // Change background image
  body.style.backgroundImage = `url("${images[currentIndex]}")`;
  // Increment index to display next image
  currentIndex = (currentIndex + 1) % images.length;
}

// Call function to change background image
changeBackgroundImage();

// Change background image every 2 seconds
setInterval(changeBackgroundImage, 2000);



// Loop through elements
Array.from(elements).forEach((element, index) => {
  // Clear existing content
  element.textContent = '';

  // Create an image element
  const imgElement = document.createElement('img');
  imgElement.src = 'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2019/11/29144739/HR-career-1024x512.png'
  //imgElement.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLxrzfci8nfsc6VV2-cKJsxdFV0hiM4NgKrWwPtmQtw&s'; // Placeholder image
  imgElement.alt = 'DGCDI Logo'; // Alt text
  imgElement.className = 'dgcdi-logo'; // Class

  // Append image
  element.appendChild(imgElement);

  // Create company info elements
  const companyNameElement = document.createElement('div');
  companyNameElement.className = 'company-name';
  companyNameElement.textContent = companyData[index].name;

  const companyDescriptionElement = document.createElement('div');
  companyDescriptionElement.className = 'company-description';
  companyDescriptionElement.textContent = companyData[index].description;

  // Append company info
  element.appendChild(companyNameElement);
  element.appendChild(companyDescriptionElement);
  
   const spanElement = document.createElement('span');
    spanElement.className = 'indicator';
    //spanElement.style.color = 'red'; // Example: Set color to red
    spanElement.style.fontWeight = 'bold'; // Example: Set font weight to bold
    // Add any other styles you want to apply
    element.appendChild(spanElement);
});





