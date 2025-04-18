let pyodideReadyPromise = loadPyodide();

async function runCode() {
  const output = document.getElementById("output");
  output.textContent = "Running...";
  let pyodide = await pyodideReadyPromise;
  try {
    let result = await pyodide.runPythonAsync(document.getElementById("code").value);
    output.textContent = result;
  } catch (err) {
    output.textContent = err;
  }
}

function clearOutput() {
  document.getElementById("output").textContent = "";
}

function downloadScript() {
  const code = document.getElementById("code").value;
  const blob = new Blob([code], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "script.py";
  a.click();
}

function loadScript(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("code").value = e.target.result;
  };
  reader.readAsText(file);
}
