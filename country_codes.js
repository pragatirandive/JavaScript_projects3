const countryList = {
    AED: "AE",
    AFN: "AF",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    BWP: "BW",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SLL: "SL",
    SOS: "SO",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    XDR: "XD",
    XAF: "XF",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };
  const api = "https://api.exchangerate-api.com/v4/latest";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("form button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".final-msg");

  for(let select of dropdowns){
    for(Currcodes in countryList){
        //console.log(Currcodes,countryList[Currcodes]);
        let newOptions = document.createElement("option");
        newOptions.innerText = Currcodes;
        newOptions.value = Currcodes;

        if(select.name === "from" && Currcodes === "USD"){
          newOptions.selected = "selected";
        } else if(select.name === "to" && Currcodes === "INR"){
          newOptions.selected = "selected";
        }

        select.append(newOptions);
    }
     
     select.addEventListener("change", (event) =>{
        updateFlag(event.target);
     });

     const updateFlag = (element) => {
      let Currcodes = element.value;
      let countryCode = countryList[Currcodes];
      let img = select.parentElement.querySelector("img");
      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
      img.src = newSrc;
    }
  }

  btn.addEventListener("click" , async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1 ){
        amtVal = 1 ;
        amount.value = "1";
      }

      const URL = `${api}/${fromCurr.value.toUpperCase()}`;

      let response = await fetch(URL);
      let data = await response.json();

      let rates = data.rates;

      let rateValue = rates[toCurr.value]; 

      let finalAmount = amtVal * rateValue;

      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});


    
