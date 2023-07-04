// Global Variables
const navbarList = document.querySelector("#navbar__list");
// End Global Variables



//create elements and assign some elements with attributes
const elementCreater = (element, attributes) => {
  const elementContainer = document.createElement(element);
  if(!(attributes == undefined)){
    const element_with_attributes = attributesCreater(elementContainer, attributes);
    return element_with_attributes;
  }else{
    return elementContainer;
  }

};

//help the elementcreater() by creating and setting attributes
const attributesCreater = (element_tag, attributesObj) => {
  if(!(attributesObj == undefined)){
    const attributes = Object.entries(attributesObj);
    for(let i=0; i < attributes.length; i++){
      const attr = document.createAttribute(attributes[i][0]);
      attr.value = attributes[i][1];
      element_tag.setAttributeNode(attr);
    }
  }
  return element_tag;
};


//add a class to a element
function addClassToElement(element_target, class_name) {
  const elementId = element_target.hash.substring(1); // get the element ID from the hash
  const section = document.getElementById(elementId); // get the element by ID
  section.classList.add(class_name); // add the class to the element's class list
}

// Function to remove a specified class from a list of elements
const removeClassFromElements = (className) => {
  // Get all the section elements
  const sections = document.querySelectorAll('section');
  // Loop through the sections and remove the specified class
  for (const section of sections) {
    section.classList.remove(className);
  }
};

// Calculate the Y coordinates of a given section element and return the result.
const element_location = (element)=>{
  let bodyElem = document.body.getBoundingClientRect().top;
  let element_section = element.getBoundingClientRect().top;
  let area_offset = element_section - bodyElem;
  return area_offset; 
}

//show active links while scrolling 
const section_location_scrolling = ()=>{
  const section_elements = document.querySelectorAll("section");
  const section_top_points = [];
  for (section_element of section_elements){
    section_top_points.push(element_location(section_element));
  }
  return section_top_points;
}

// End Helper Functions


// Function to build the navigation menu
const addNavElements = () => {
  const section = document.querySelectorAll("section");
  for (let i = 0; i < section.length; i++) {
    const listItem = document.createElement("li");
    const anchorTag = document.createElement("a");
    anchorTag.setAttribute("href", `#section${i + 1}`);
    anchorTag.className = "menu__link";
    anchorTag.textContent = `section ${i + 1}`;
    listItem.appendChild(anchorTag);
    navbarList.appendChild(listItem);
  }
};



// Add a highlight class to the section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');


function highlightNavLink() {
  const scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      section.classList.add('active-section');
      const href = `#${section.id}`;
      navLinks.forEach(link => {
        if (link.getAttribute('href') === href) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    } else {
      section.classList.remove('active-section');
    }
  });
}

//scroll to a section when menu links are clicked
const click_on_nav_link = (evt)=>{
  if(evt.target.className == "menu__link"){
    const section_element = document.querySelector(evt.target.hash)
    const section_top = element_location(section_element);
    window.scrollTo({top:section_top, behavior: "smooth"});
    removeClassFromElements("your-active-class");
    addClassToElement(evt.target, "your-active-class");
  }
}

//while scroll change the background color for the menu links 
const scroll_active_links = ()=>{
  const section_points = section_location_scrolling();
  for(let i = 0; i < section_points.length; i++){
    const links = document.querySelectorAll(".menu__link");
    if(window.scrollY >= section_points[i] && !(window.scrollY > section_points[i+1])){
      links[i].style.cssText = "background-color: #646D7E;";
    }else{
      links[i].style.cssText = "background-color: #fff;";
    }
  }
}

//Button 
// Select the button and the top of the page
const goTopButton = document.getElementById('go-top-button');
const topOfPage = document.querySelector('body');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    goTopButton.style.display = 'block';
  } else {  goTopButton.style.display = 'none'; }});

  goTopButton.addEventListener('click', () => {
  topOfPage.scrollIntoView({ behavior: 'smooth' });
});
// End Main Functions


window.addEventListener("DOMContentLoaded", addNavElements);// Load navElementAdder function second in the bubbling phase
document.addEventListener('click', click_on_nav_link);// Scroll to section on link click
window.addEventListener("scroll", scroll_active_links);//listen for a scroll event


