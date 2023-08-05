
const colorBtn = document.getElementById('color-btn')
const colorInput = document.getElementById('color-input')
const colorScheme = document.getElementById('scheme-input')

let colorInputValue = ``
let schemeValue = ``
let templateString = ``
const initialColor = `000000`
const initialScheme = `monochrome`

colorBtn.addEventListener("click", function() {
    // Get input from user
    getInputUser()
    
    // Transform the hexa color without hash
    let hexaColorValue = colorInputValue.slice(1)
    
    // Make request and render
    processFetchRequest(hexaColorValue, schemeValue)
    
})

document.getElementById('clickable-info')
// Get input from user to make fetch request
function getInputUser() {
    colorInputValue = colorInput.value
    schemeValue = colorScheme.value 
}

// Fetch information
function processFetchRequest(hexa, scheme)
{   
    document.getElementById('output-row').innerHTML = `
    <div class='loading-div'>
        <img src="spinner1.svg">
        <p>Embrace the artistry of the Color Alchemist...</p>
    </div>`
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexa}&mode=${scheme}&count=5`, 
    {method: "GET"})
        .then(response => response.json())
        .then(data => {
            setTimeout(function() 
            {
                let temporaryString = ''
                for (let i = 0; i < 5; i++) {
                temporaryString += `
                <div class="display-color" style="background-color:${data.colors[i].hex.value}">
                    <div class="color-info">
                        <h4>${data.colors[i].name.value}</h4>
                        <p id='clickable-info'>${data.colors[i].hex.value}</p>
                    </div>
                </div>`
                }
                templateString = temporaryString
                document.getElementById('output-row').innerHTML = templateString
                
                // Make the hexa code clickable
                document.getElementById('output-row').addEventListener('click', function(event) {
                    if (event.target.id === 'clickable-info')
                    {
                        const textNode = document.createTextNode(event.target.textContent);
                        document.execCommand('copy', false, textNode);
                    }
                })
             }, 1000)
        }) 
        
}

// Initialize display color 
processFetchRequest(initialColor, initialScheme)

