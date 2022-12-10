//Global Selectors
const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

//prevent form Defulat
const onSubmit = (e) => {
  e.preventDefault();

  clearUI(); //! clear the UI

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  console.log(url, size);

  //Form Validation //!Validation
  if (url === "") {
    alert("Enter a valid URL");
  } else {
    showUISpinner();
    //hide the spinner after 1 second
    setTimeout(() => {
      //! hide the spinner
      hideUISpinner();
      //! call the qr code generator fucntion
      generateQRCode(url, size);
      //! call the save button fucntion
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        saveButton(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrCode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

//!Spinner Fucntions

//Show the spinner in the UI function

const showUISpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

//Hide the spinner in the UI function
const hideUISpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Creat Save Button function

const saveButton = (saveURL) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveURL;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

/* Trigger the hideUISpinner function by defualt
,So it's hidden untill the user submit the form.
*/
hideUISpinner(); //!  hideUISpinner() function triger

// Form submit addEventListner
form.addEventListener("submit", onSubmit);
