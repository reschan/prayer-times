/* reference api url https://api.aladhan.com/v1/timingsByCity/01-01-2025?city=London&country=GB*/

const isoCountryCodes = [
    "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ",
    "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS",
    "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN",
    "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE",
    "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF",
    "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM",
    "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM",
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

/* initialize dropdowns */
function populate() {
    country_dropdown = document.getElementById("sel-country")
    for (let i = 0; i < isoCountryCodes.length; i++) {
        elem = document.createElement("option");
        elem.value = isoCountryCodes[i];
        elem.textContent = isoCountryCodes[i];
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
        wrapper = document.createElement("div");
        wrapper.className = "flex-horizontal-container";

        timing = document.createElement("div");
        timing.className = "flex-padding-4 border-grid";
        timingText = document.createElement("p");
        timingText.textContent = key;
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

window.onload = populate;
