// Function to show only the selected section
function showSection(sectionId) {
    let sections = document.querySelectorAll("section");
    sections.forEach(section => section.classList.remove("active-section"));
    document.getElementById(sectionId).classList.add("active-section");
}

document.addEventListener("DOMContentLoaded", function() {
    showSection('about');
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            let sectionId = this.getAttribute("data-section");
            showSection(sectionId);
        });
    });
});

// Improved Event Tracking
document.addEventListener("click", function(event) {
    let elementType = "Other";
    if (event.target.tagName === "IMG") elementType = "Image";
    else if (event.target.tagName === "SELECT") elementType = "Dropdown";
    else if (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT") elementType = "Text Input";

    console.log("Click Event:", {
        timestamp: new Date(),
        type: event.type,
        element: elementType
    });
});

function analyzeText() {
    let text = document.getElementById("text-input").value;
    let letters = text.replace(/[^a-zA-Z]/g, "").length;

    // Updated word processing logic
    let rawWordsArray = text.trim().split(/\s+/);
    let wordsArray = rawWordsArray.filter(w => w.match(/[a-zA-Z0-9]/)); // Only count actual words
    let words = (text.trim() === "") ? 0 : wordsArray.length;

    let spaces = (text.match(/ /g) || []).length; // only spaces, not all whitespace
    let newlines = (text.match(/\n/g) || []).length;
    let specialSymbols = text.replace(/[a-zA-Z0-9\s]/g, "").length;

    // Tokenization Lists (Keep original case)
    let pronouns = ["I", "You", "He", "She", "It", "We", "They", "Me", "Him", "Her", "Us", "Them"];
    let prepositions = ["In", "On", "At", "With", "By", "To", "From", "About", "As", "Into", "After", "Over"];
    let articles = ["A", "An"];

    // Count each type and group them
    let pronounCounts = countWords(wordsArray, pronouns);
    let prepositionCounts = countWords(wordsArray, prepositions);
    let articleCounts = countWords(wordsArray, articles);

    // Generate Output Text
    document.getElementById("text-output").innerHTML = `
        <strong>Basic Analysis:</strong><br>
        Letters: ${letters} <br>
        Words: ${words} <br>
        Spaces: ${spaces} <br>
        Newlines: ${newlines} <br>
        Special Symbols: ${specialSymbols} <br><br>

        <strong>Pronoun Count:</strong> <br> ${formatCountOutput(pronounCounts)} <br><br>
        <strong>Preposition Count:</strong> <br> ${formatCountOutput(prepositionCounts)} <br><br>
        <strong>Indefinite Article Count:</strong> <br> ${formatCountOutput(articleCounts)}
    `;
}


// Function to count occurrences of each word in any case
function countWords(wordsArray, wordList) {
    let wordCount = {};
    
    // Initialize count for each word
    wordList.forEach(word => wordCount[word] = 0);

    wordsArray.forEach(word => {
        let capitalizedWord = capitalizeFirstLetter(word);
        if (wordList.includes(capitalizedWord)) {
            wordCount[capitalizedWord]++;
        }
    });

    return wordCount;
}

// Function to capitalize first letter (handles case sensitivity)
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Function to format word count output for display
function formatCountOutput(wordCount) {
    let output = "";
    for (let word in wordCount) {
        if (wordCount[word] > 0) {
            output += `${word}: ${wordCount[word]}<br>`;
        }
    }
    return output || "None found";
}
