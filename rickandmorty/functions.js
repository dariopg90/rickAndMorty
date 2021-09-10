const getStyles = () => {
  const JSONColorStyles = localStorage.getItem("colorStyles");
  colorStyles = JSONColorStyles ? JSON.parse(JSONColorStyles) : [];
};

const saveStyles = () => {
  localStorage.setItem("colorStyles", JSON.stringify(colorStyles));
};

const getColorStylesSavedData = () => {
  const JSONdata = localStorage.getItem("colorStylesSavedData");
  colorStylesSavedData = JSONdata ? JSON.parse(JSONdata) : [];
};

const saveColorStylesSavedData = () => {
  localStorage.setItem(
    "colorStylesSavedData",
    JSON.stringify(colorStylesSavedData)
  );
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////Render Cards Function//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const renderCards = (data) => {
  rootDiv.innerHTML = null;
  getStyles();
  getColorStylesSavedData();
  data.forEach((data) => {
    if (!colorStylesSavedData.includes(pagination)) {
      colorStyles.push({
        id: data.id,
        textColor: "black",
        backgroundColor: "white",
        erased: false,
      });
    }
    ///////////////////////////////////////////////////////////
    //////////////////API DOM Elements/////////////////////////
    ///////////////////////////////////////////////////////////

    const APIdiv = document.createElement("div");
    const APIimage = document.createElement("img");
    const APIpar = document.createElement("p");
    const APIlist = document.createElement("ul");
    const APIli1 = document.createElement("li");
    const APIli2 = document.createElement("li");
    const APIli3 = document.createElement("li");

    APIdiv.classList.add("API-div");
    APIimage.classList.add("API-image");
    APIpar.classList.add("API-p");
    APIlist.classList.add("API-ul");
    APIli1.classList.add("API-li");
    APIli1.classList.add("API-li1");
    APIli2.classList.add("API-li");
    APIli2.classList.add("API-li2");
    APIli3.classList.add("API-li");
    APIli3.classList.add("API-li3");

    APIpar.textContent = data.name;
    APIli1.textContent = "VIEW";
    APIli2.textContent = "EDIT";
    APIli3.textContent = "DELETE";
    APIdiv.setAttribute("id", data.id);
    APIpar.setAttribute("id", "T" + data.id);
    APIimage.setAttribute("src", data.image);

    APIlist.appendChild(APIli1);
    APIlist.appendChild(APIli2);
    APIlist.appendChild(APIli3);

    APIdiv.appendChild(APIimage);
    APIdiv.appendChild(APIpar);
    APIdiv.appendChild(APIlist);
    rootDiv.appendChild(APIdiv);

    ///////////////////////////////////////////////////////////
    //////////////////DOM Elements functions///////////////////
    ///////////////////////////////////////////////////////////

    APIli1.addEventListener("click", () => {
      let gender;
      if (data.gender === "Male") {
        gender = "He";
      } else if (data.gender === "Female") {
        gender = "She";
      } else {
        gender = "This";
      }
      popupHeader.textContent = `This is ${data.name}`;
      popupPar.textContent = `${gender} is a ${data.gender} ${data.species} that is currently ${data.status},
                      ${gender} was born in ${data.origin.name} and currently resides in 
                      ${data.location.name}`;
      popupImg.setAttribute("src", data.image);

      document.getElementById("popup").style.zIndex = "1000";
      document.getElementById("popup").style.visibility = "visible";
    });

    APIli2.addEventListener("click", () => {
      document.getElementById("edit").style.zIndex = "1000";
      document.getElementById("edit").style.visibility = "visible";
      const copyDom = renderCopy(data);
      copyCont.appendChild(copyDom);

      renderColors(colorArray, data.id);
    });

    APIli3.addEventListener("click", () => {
      APIdiv.style.display = "none";
      deleteCard(data.id);
    });

    if (data.name.length > 15) {
      APIpar.style.fontSize = "1.4rem";
      APIpar.style.textAlign = "1.4rem";
    }
  });

  setCards(data);
  document.getElementById(`pag${pagination.toString()}`).style.backgroundColor = 'cadetblue'
  colorStylesSavedData.push(pagination);
  saveStyles();
  saveColorStylesSavedData();
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////End Render Cards Function//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteCard = (id) => {
  getStyles();
  const index = colorStyles.findIndex((color) => id === color.id);
  console.log(index);
  console.log(colorStyles[index].erased);
  colorStyles[index].erased = true;
  saveStyles();
};

const setCards = (array) => {
  array.forEach((data) => {
    let color = colorStyles.find((color) => color.id === data.id);

    document.getElementById(data.id).style.backgroundColor =
      color.backgroundColor;
    document.getElementById(data.id).style.color = color.textColor;

    if (color.erased) {
      document.getElementById(data.id).style.display = "none";
    }
  });
};

const renderPag = () => {
  pagDiv.innerHTML = null;
  let pagNum = 0;

  for (let i = 0; i < 34; i++) {
    pagNum++;
    const pagEl = document.createElement("a");
    pagEl.textContent = pagNum;
    pagEl.classList.add("pag-item");
    pagEl.setAttribute('id','pag'+pagNum)
    pagDiv.appendChild(pagEl);

    pagEl.addEventListener("click", (e) => {     
      pagination = parseInt(e.originalTarget.textContent);
      currentPage = e.originalTarget.textContent;
      getURL();
    });

   
  }
};

const renderColors = (array, id) => {
  colorArrayDiv.innerHTML = null;

  getStyles();
  const index = colorStyles.findIndex((data) => data.id === id);

  array.forEach((color) => {
    const colorSpan = document.createElement("span");
    colorSpan.classList.add("color-square");
    colorSpan.style.backgroundColor = color;
    colorSpan.style.color = color;
    colorArrayDiv.appendChild(colorSpan);

    colorSpan.addEventListener("click", () => {
      const innerColor = colorSpan.style.backgroundColor;

      if (editBack && !editText) {
        colorStyles[index].backgroundColor = innerColor;
        document.getElementById(`${id}`).style.backgroundColor = innerColor;
        document.getElementById(`copy${id}`).style.backgroundColor = innerColor;
      } else if (!editBack && editText) {
        colorStyles[index].textColor = innerColor;
        document.getElementById(`T${id}`).style.color = innerColor;
        document.getElementById(`copyT${id}`).style.color = innerColor;
      }
    });
  });
};

const renderCopy = (array) => {
  const object = {
    color: ["red", "blue"],
    ...array,
  };

  const copyAPIdiv = document.createElement("div");
  const copyAPIimage = document.createElement("img");
  const copyAPIpar = document.createElement("p");
  const copyAPIlist = document.createElement("ul");
  const copyAPIli1 = document.createElement("li");
  const copyAPIli2 = document.createElement("li");
  const copyAPIli3 = document.createElement("li");

  copyAPIdiv.classList.add("copyAPI-div");
  copyAPIimage.classList.add("API-image");
  copyAPIpar.classList.add("API-p");
  copyAPIlist.classList.add("API-ul");
  copyAPIli1.classList.add("API-li");
  copyAPIli1.classList.add("API-li1");
  copyAPIli2.classList.add("API-li");
  copyAPIli2.classList.add("API-li2");
  copyAPIli3.classList.add("API-li");
  copyAPIli3.classList.add("API-li3");

  copyAPIpar.textContent = object.name;
  copyAPIli1.textContent = "VIEW";
  copyAPIli2.textContent = "EDIT";
  copyAPIli3.textContent = "DELETE";
  copyAPIdiv.setAttribute("id", "copy" + object.id);
  copyAPIpar.setAttribute("id", "copyT" + array.id);
  copyAPIimage.setAttribute("src", object.image);
  copyAPIlist.appendChild(copyAPIli1);
  copyAPIlist.appendChild(copyAPIli2);
  copyAPIlist.appendChild(copyAPIli3);
  copyAPIdiv.appendChild(copyAPIimage);
  copyAPIdiv.appendChild(copyAPIpar);
  copyAPIdiv.appendChild(copyAPIlist);

  if (object.name.length > 15) {
    copyAPIpar.style.fontSize = "1.4rem";
    copyAPIpar.style.textAlign = "1.4rem";
  }

  copyAPIdiv.style.backgroundColor = document.getElementById(
    `${array.id}`
  ).style.backgroundColor;

  copyAPIpar.style.color = document.getElementById(`T${array.id}`).style.color;
  return copyAPIdiv;
};
