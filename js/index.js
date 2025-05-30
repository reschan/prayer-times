/* reference api url https://api.aladhan.com/v1/timingsByCity/01-01-2025?city=London&country=GB*/

const selectedTiming = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha", "Midnight"];

const timingTranslation = {"Fajr": "Dawn", "Sunrise": "Morning", "Dhuhr": "Noon", "Asr": "Afternoon", "Maghrib": "Evening", "Isha": "Night", "Midnight": "Midnight"}

const isoCountryCodes = [
    "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ",
    "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS",
    "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN",
    "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE",
    "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF",
    "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM",
    "HN", "HR", "HT", "HU", "ID", "IE", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM",
    "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC",
    "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK",
    "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA",
    "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG",
    "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW",
    "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS",
    "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO",
    "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI",
    "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"
];

const isoCountryNames = {
    "AD": "Andorra", "AE": "United Arab Emirates", "AF": "Afghanistan", "AG": "Antigua and Barbuda",
    "AI": "Anguilla", "AL": "Albania", "AM": "Armenia", "AO": "Angola", "AQ": "Antarctica",
    "AR": "Argentina", "AS": "American Samoa", "AT": "Austria", "AU": "Australia", "AW": "Aruba",
    "AX": "Åland Islands", "AZ": "Azerbaijan", "BA": "Bosnia and Herzegovina", "BB": "Barbados",
    "BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BH": "Bahrain",
    "BI": "Burundi", "BJ": "Benin", "BL": "Saint Barthélemy", "BM": "Bermuda", "BN": "Brunei",
    "BO": "Bolivia", "BQ": "Bonaire, Sint Eustatius and Saba", "BR": "Brazil", "BS": "Bahamas",
    "BT": "Bhutan", "BV": "Bouvet Island", "BW": "Botswana", "BY": "Belarus", "BZ": "Belize",
    "CA": "Canada", "CC": "Cocos (Keeling) Islands", "CD": "Congo (DRC)", "CF": "Central African Republic",
    "CG": "Congo (Republic)", "CH": "Switzerland", "CI": "Côte d'Ivoire", "CK": "Cook Islands",
    "CL": "Chile", "CM": "Cameroon", "CN": "China", "CO": "Colombia", "CR": "Costa Rica",
    "CU": "Cuba", "CV": "Cabo Verde", "CW": "Curaçao", "CX": "Christmas Island", "CY": "Cyprus",
    "CZ": "Czechia", "DE": "Germany", "DJ": "Djibouti", "DK": "Denmark", "DM": "Dominica",
    "DO": "Dominican Republic", "DZ": "Algeria", "EC": "Ecuador", "EE": "Estonia", "EG": "Egypt",
    "EH": "Western Sahara", "ER": "Eritrea", "ES": "Spain", "ET": "Ethiopia", "FI": "Finland",
    "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "FR": "France",
    "GA": "Gabon", "GB": "United Kingdom", "GD": "Grenada", "GE": "Georgia", "GF": "French Guiana",
    "GG": "Guernsey", "GH": "Ghana", "GI": "Gibraltar", "GL": "Greenland", "GM": "Gambia",
    "GN": "Guinea", "GP": "Guadeloupe", "GQ": "Equatorial Guinea", "GR": "Greece", "GS": "South Georgia",
    "GT": "Guatemala", "GU": "Guam", "GW": "Guinea-Bissau", "GY": "Guyana", "HK": "Hong Kong",
    "HM": "Heard Island and McDonald Islands", "HN": "Honduras", "HR": "Croatia", "HT": "Haiti",
    "HU": "Hungary", "ID": "Indonesia", "IE": "Ireland", "IM": "Isle of Man",
    "IN": "India", "IO": "British Indian Ocean Territory", "IQ": "Iraq", "IR": "Iran", "IS": "Iceland",
    "IT": "Italy", "JE": "Jersey", "JM": "Jamaica", "JO": "Jordan", "JP": "Japan", "KE": "Kenya",
    "KG": "Kyrgyzstan", "KH": "Cambodia", "KI": "Kiribati", "KM": "Comoros", "KN": "Saint Kitts and Nevis",
    "KP": "North Korea", "KR": "South Korea", "KW": "Kuwait", "KY": "Cayman Islands", "KZ": "Kazakhstan",
    "LA": "Laos", "LB": "Lebanon", "LC": "Saint Lucia", "LI": "Liechtenstein", "LK": "Sri Lanka",
    "LR": "Liberia", "LS": "Lesotho", "LT": "Lithuania", "LU": "Luxembourg", "LV": "Latvia",
    "LY": "Libya", "MA": "Morocco", "MC": "Monaco", "MD": "Moldova", "ME": "Montenegro",
    "MF": "Saint Martin", "MG": "Madagascar", "MH": "Marshall Islands", "MK": "North Macedonia",
    "ML": "Mali", "MM": "Myanmar", "MN": "Mongolia", "MO": "Macao", "MP": "Northern Mariana Islands",
    "MQ": "Martinique", "MR": "Mauritania", "MS": "Montserrat", "MT": "Malta", "MU": "Mauritius",
    "MV": "Maldives", "MW": "Malawi", "MX": "Mexico", "MY": "Malaysia", "MZ": "Mozambique",
    "NA": "Namibia", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria",
    "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NP": "Nepal", "NR": "Nauru",
    "NU": "Niue", "NZ": "New Zealand", "OM": "Oman", "PA": "Panama", "PE": "Peru", "PF": "French Polynesia",
    "PG": "Papua New Guinea", "PH": "Philippines", "PK": "Pakistan", "PL": "Poland", "PM": "Saint Pierre and Miquelon",
    "PN": "Pitcairn Islands", "PR": "Puerto Rico", "PS": "Palestine", "PT": "Portugal", "PW": "Palau",
    "PY": "Paraguay", "QA": "Qatar", "RE": "Réunion", "RO": "Romania", "RS": "Serbia", "RU": "Russia",
    "RW": "Rwanda", "SA": "Saudi Arabia", "SB": "Solomon Islands", "SC": "Seychelles", "SD": "Sudan",
    "SE": "Sweden", "SG": "Singapore", "SH": "Saint Helena", "SI": "Slovenia", "SJ": "Svalbard and Jan Mayen",
    "SK": "Slovakia", "SL": "Sierra Leone", "SM": "San Marino", "SN": "Senegal", "SO": "Somalia",
    "SR": "Suriname", "SS": "South Sudan", "ST": "São Tomé and Príncipe", "SV": "El Salvador",
    "SX": "Sint Maarten", "SY": "Syria", "SZ": "Eswatini", "TC": "Turks and Caicos Islands",
    "TD": "Chad", "TF": "French Southern Territories", "TG": "Togo", "TH": "Thailand", "TJ": "Tajikistan",
    "TK": "Tokelau", "TL": "Timor-Leste", "TM": "Turkmenistan", "TN": "Tunisia", "TO": "Tonga",
    "TR": "Turkey", "TT": "Trinidad and Tobago", "TV": "Tuvalu", "TW": "Taiwan", "TZ": "Tanzania",
    "UA": "Ukraine", "UG": "Uganda", "UM": "United States Minor Outlying Islands", "US": "United States",
    "UY": "Uruguay", "UZ": "Uzbekistan", "VA": "Vatican City", "VC": "Saint Vincent and the Grenadines",
    "VE": "Venezuela", "VG": "British Virgin Islands", "VI": "U.S. Virgin Islands", "VN": "Vietnam",
    "VU": "Vanuatu", "WF": "Wallis and Futuna", "WS": "Samoa", "YE": "Yemen", "YT": "Mayotte",
    "ZA": "South Africa", "ZM": "Zambia", "ZW": "Zimbabwe"
};

isoCountryCodes.sort((a, b) => {
    const nameA = isoCountryNames[a];
    const nameB = isoCountryNames[b];
    return nameA.localeCompare(nameB);
});

/* initialize dropdowns */
function populate_dropdown() {
    country_dropdown = document.getElementById("sel-country")
    for (let i = 0; i < isoCountryCodes.length; i++) {
        elem = document.createElement("option");
        elem.value = isoCountryCodes[i];
        elem.textContent = isoCountryNames[isoCountryCodes[i]];
        country_dropdown.appendChild(elem);
    }
}

function resolve_input() {
    res = "https://api.aladhan.com/v1/timingsByCity/";
    
    /* get date */
    datetime = new Date();
    res += String(datetime.getDate()) + "-" + String(datetime.getMonth() + 1) + "-" + String(datetime.getFullYear());
    /* get city */
    res += "?city=" + document.getElementById("inp-city").value;
    /* get country */
    res += "&country=" + document.getElementById("sel-country").value;
    /* set method */
    res += "&method=3"
    request_data(res);
}

function request_data(api_addr) {
    fetch(api_addr)
        .then((response) =>  {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.json();
        })
        .then((json) => populate_data(json.data))
        .catch((err) => console.error(`Fetch problem: ${err.message}`));
}

function populate_data(json) {
    console.log(json);
    
    queryTime = document.getElementById("query-time");
    datetime = new Date();
    queryTime.textContent = `Query time (local): ${datetime.toString()}`;

    timezone = document.getElementById("timezone");
    timezone.textContent = `Result timezone: ${json.meta.timezone.replace("_", " ")}`;

    /*
    reference
    <div class="flex-horizontal-container" style="width: 100%;">
        <div class="flex-padding-4 border-grid" style="">Timings</div>
        <div class="flex-padding-2 border-grid" style="">Time</div>
    </div>
    */
    resultWrapper = document.getElementById("result-wrapper");
    resultWrapper.innerHTML = "";

    wrapper = document.createElement("div");
    wrapper.className = "flex-horizontal-container";

    timing = document.createElement("div");
    timing.className = "flex-padding-4 border-grid";
    timingText = document.createElement("p");
    timingText.textContent = "Timing";
    timingText.style.width = "auto";
    timing.appendChild(timingText);

    time = document.createElement("div");
    time.className = "flex-padding-2 border-grid";
    timeText = document.createElement("p");
    timeText.textContent = "Time";
    timeText.style.width = "auto";
    time.appendChild(timeText);

    wrapper.appendChild(timing);
    wrapper.appendChild(time);
    
    resultWrapper.appendChild(wrapper);

    for (const [key, value] of Object.entries(json.timings)) {
        if (!selectedTiming.includes(key)) {
            continue;
        }
        wrapper = document.createElement("div");
        wrapper.className = "flex-horizontal-container";

        timing = document.createElement("div");
        timing.className = "flex-padding-4 border-grid";
        timingText = document.createElement("p");
        timingText.textContent = timingTranslation[key];
        timingText.style.width = "auto";
        timing.appendChild(timingText);

        time = document.createElement("div");
        time.className = "flex-padding-2 border-grid";
        timeText = document.createElement("p");
        timeText.textContent = value;
        timeText.style.width = "auto";
        time.appendChild(timeText);

        wrapper.appendChild(timing);
        wrapper.appendChild(time);
        
        resultWrapper.appendChild(wrapper);
    }
}

window.onload = populate_dropdown;
