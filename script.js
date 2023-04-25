const convertButton = document.getElementById("convert-button");
const inputText = document.getElementById("input-text");
const resultText = document.getElementById("result-text");
const copyButton = document.getElementById("copy-button");

function replaceLineBreaks(str) {
  const regex = /"([^"]+)"/g;
  return str.replace(regex, (match, capture) => {
    const replaced = capture.replace(/\n/g, "<br/>");
    return replaced;
  });
}

convertButton.addEventListener("click", () => {
  const input = replaceLineBreaks(inputText.value);
  const rows = input.trim().split("\n");
  const headers = rows[0].split("\t");
  const mdTable = `|${headers.join("|")}|\n|${headers
    .map(() => "---")
    .join("|")}|\n${rows
    .slice(1)
    .map(
      (row) =>
        `|${row
          .split("\t")
          .map((cell) => cell.replace(/\n/g, "<br>"))
          .join("|")}|`
    )
    .join("\n")}`;
  resultText.value = mdTable;
});

copyButton.addEventListener("click", () => {
  resultText.select();
  navigator.clipboard
    .writeText(resultText.value)
    .then(() => {
      console.log("마크다운 테이블이 복사되었습니다.");
    })
    .catch((error) => {
      console.error("마크다운 테이블 복사 중 오류가 발생했습니다.", error);
    });
});
