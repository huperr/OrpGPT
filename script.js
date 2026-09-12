const inputTxt = document.getElementById("inputTxt")
const sendBtn = document.getElementById("sendBtn")
const outputTxt = document.getElementById("outputTxt")
const outputList = document.getElementById("outputList")
sendBtn.addEventListener("click", input)
async function input() {
  const prompt = inputTxt.value
  outputTxt.textContent = "yeah gimme a sec"
  try {
    const response = await fetch("https://orpgpt-api.thehien19121003.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt
      })
    });
    const data = await response.json()
    console.log("response:", data)
    console.log("status: ", response.status)
    const li = document.createElement("li")
    li.textContent = "OrpGPT: " + data.choices[0].message.content
    outputList.appendChild(li)
    outputTxt.textContent = ""
    console.log("replied")
  }
  catch(error) {
    outputTxt.textContent = "Error: " + error.message
  }
}
