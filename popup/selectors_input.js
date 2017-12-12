const submitEle = document.querySelector(".submit");
$('.selector').each(function (index, item) {
    item.originPlaceholder = item.placeholder;
});
$('.selector').focus(function (e) {
    e.target.placeholder = '准备输入选择器...';
}).blur(function (e) {
    e.target.placeholder = e.target.originPlaceholder;
});
$('.reset').click(function (e) {
    $('.selector').value = '';
});

$('.submit').click(function (e) {
    e.preventDefault();

    function reportError(error) {
        console.error(`Could not messageSelector: ${error}`);
    }

    const selectorsJson = $('.selectors-obj').text();
    // alert(selectorsJson);
    browser.tabs.query({active: true, currentWindow: true})
    .then(function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            // selectorsPairObj
           selectorsJson
        });
    })
    .catch(reportError)
    .then(function () {
        $('.selectors-obj')[0].value = '';
    });
});

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute dom-to-json content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/dom-to-json.js"})
    .catch(reportExecuteScriptError);