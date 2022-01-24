const form = document.forms["calc"];
const btnCalc = document.getElementById("btnCalc");
const ratingBox = document.getElementById("ratingBox");
const detailBox = document.getElementById("detailBox");
const SERVER = "abit-calc.herokuapp.com"


const getCert = (form) => {
  const cert1 = form.elements.namedItem("cert1").value;
  const nameCert1 = form.nameCert1.selectedOptions[0].value;
  const cert2 = form.elements.namedItem("cert2").value;
  const nameCert2 = form.nameCert2.selectedOptions[0].value;
  const cert3 = form.elements.namedItem("cert3").value;
  const nameCert3 = form.nameCert3.selectedOptions[0].value;
  return {
    cert1,
    cert2,
    cert3,
    certName1: nameCert1,
    certName2: nameCert2,
    certName3: nameCert3,
  };
};

const getCoef = (form) => {
  const coef1 = form.elements.namedItem("coef1").checked
    ? form.elements.namedItem("coef1").value
    : 1;
  const coef2 = form.elements.namedItem("coef2").checked
    ? form.elements.namedItem("coef1").value
    : 1;
  return { coef1, coef2 };
};

const getAtestat = (form) => {
  const atestat = form.elements.namedItem("atestat").value;
  return { atestat };
};

const getPriorutet = (form) => {
  let prior = form.elements.namedItem("priorytet").value;
  if (prior < 3){
    prior = 1.02;
  }
  else prior = 1;
  return { prior }; 
}

const getCertCoef = (certificates, certName1, certName2, certName3) => {
  let certCoef1, certCoef2, certCoef3;
  for (elem of certificates) {
    if (elem.priority === 1 && elem.name === certName1) {
      certCoef1 = elem.coef;
    } else if (elem.priority === 2 && elem.name === certName2) {
      certCoef2 = elem.coef;
    } else if (elem.priority === 3 && elem.name === certName3) {
      certCoef3 = elem.coef;
    }
  }
  return { certCoef1, certCoef2, certCoef3 };
};

const renderStat = (program, data) => {
  
  const z1 = document.createElement("li");
  const z2 = document.createElement("li");
  const z3 = document.createElement("li");
  const z4 = document.createElement("li");
  const h4 = document.createElement("h4");
  h4.innerText = program;
  z1.innerText = 'Кількість поданих заяв у 2021році: 155';
  z4.innerText = 'Ліцензований обсяг: 80';
  z2.innerText = 'Кількість державний місць: 25';
  z3.innerText = 'Прохідний бал на місце держ.замовлення: 177.955';

  detailBox.append(h4, z1, z4, z2, z3);
  for (stat of data) {
    const h5 = document.createElement("h4");
    const ul = document.createElement("ul");
    h5.innerText = stat.year;
    for (indicator of stat.indicators) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${indicator.name}</span> - <span>${indicator.value}</span>`;
      ul.append(li);
    }
    detailBox.append(h5, ul);
  }
};


const detailStat = async (event) => {
  detailBox.innerHTML = "";
  const id = event.target.dataset.id;
  const program = event.target.dataset.name;
  console.log(id);
  const response = await fetch(`https://${SERVER}/api/stat/${id}`);
  const data = await response.json();

  renderStat(program, data);
};

const render = (rating) => {
  const ul = document.createElement("ul");
  const programs = Object.entries(rating);
  for (let elem of programs) {
    const li = document.createElement("li");
    const btnStat = document.createElement("button");
    const span = document.createElement("span");
    btnStat.innerText = "Статистика";
    btnStat.dataset.id = elem[0];
    btnStat.dataset.name = elem[1][0];
    btnStat.addEventListener("click", detailStat);
    li.innerText = `${elem[1][0]} - `;
    span.innerText = elem[1][1];
    li.append(span, btnStat);
    ul.append(li);
  }
  ratingBox.append(ul);
};

const calculate = async (event) => {
  event.preventDefault();
  ratingBox.innerHTML = "";
  const cert = getCert(form);
  const { cert1, cert2, cert3 } = cert;
  const { certName1, certName2, certName3 } = cert;
  const { atestat } = getAtestat(form);
  const { coef1, coef2 } = getCoef(form);
  const { prior } = getPriorutet(form);

  const domain = form.elements.namedItem("domain").value;
  const response = await fetch(`https://${SERVER}/api/prog/${domain}`);
  const data = await response.json();

  const rating = {};
  for (let elem of data) {
    const id = elem._id;
    const program = elem.program.name;
    const certCoef = getCertCoef(
      elem.certificates,
      certName1,
      certName2,
      certName3
    );
    const { certCoef1, certCoef2, certCoef3 } = certCoef;
    const atestatCoef = elem.attestation.coef;
    const point =
      (certCoef1 * cert1 +
        certCoef2 * cert2 +
        certCoef3 * cert3 +
        atestat * atestatCoef) *
      coef1 *
      coef2 * prior;
    let corectPoint = point.toFixed(3);
    if (point > 200) {
        corectPoint = 200;
    }
    rating[id] = [program, corectPoint];
  } 
  console.log(rating);

  render(rating);
};

btnCalc.addEventListener("click", calculate);
