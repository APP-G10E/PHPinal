// Function to get HTML from JSON based on the specified language and key
function getHtmlFromJson(json, lang, key) {
    return json[lang][key];
}

// Function to set HTML in JSON based on the specified language and key
function setHtmlInJson(json, lang, key, value) {
    json[lang][key] = value;
}

// Function to fetch JSON data from the server
async function fetchJsonData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Function to update JSON data on the server
async function updateJsonData(url, updatedJson) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJson)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// Get the dropdowns, textarea, and button elements
const languageSelect = document.getElementById("language-select");
const htmlSelect = document.getElementById("html-select");
const htmlEditor = document.getElementById("html-editor");
const saveButton = document.getElementById("save-button");

let jsonData;

// Function to load the selected HTML content into the textarea
function loadHtmlContent() {
    const selectedLanguage = languageSelect.value;
    const selectedHtml = htmlSelect.value;
    htmlEditor.value = getHtmlFromJson(jsonData, selectedLanguage, selectedHtml);
}

// Event listener for the language and HTML selection changes
languageSelect.addEventListener("change", loadHtmlContent);
htmlSelect.addEventListener("change", loadHtmlContent);

// Event listener for the save button
saveButton.addEventListener("click", async () => {
    const selectedLanguage = languageSelect.value;
    const selectedHtml = htmlSelect.value;
    const updatedHtml = htmlEditor.value;
    setHtmlInJson(jsonData, selectedLanguage, selectedHtml, updatedHtml);
    console.log("Updated JSON:", JSON.stringify(jsonData, null, 2));

    try {
        const result = await updateJsonData('../Controller/update-json.php', jsonData);
        if (result.status === 'success') {
            alert('JSON file updated successfully');
        } else {
            alert('Error updating JSON file');
        }
    } catch (error) {
        console.error('Error updating JSON data:', error);
        alert('Error updating JSON file');
    }
});

// Fetch JSON data from the server and load the initial content
fetchJsonData('../Controller/get-json.php')
    .then(data => {
        jsonData = data;
        loadHtmlContent();
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
