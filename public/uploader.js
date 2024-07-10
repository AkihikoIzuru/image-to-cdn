document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("imageFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Pilih Filemu.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById(
        "result"
      ).innerText = `Gambar telah terupload: ${result.url}`;
    } else {
      document.getElementById("result").innerText = `Error: ${result.message}`;
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("result").innerText = `Error: ${error.message}`;
  }
});
