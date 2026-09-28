window.addEventListener('load', function() {
    const blocks = document.querySelectorAll('code.language-wavedrom');
    blocks.forEach((block, index) => {
        try {
            const rawJson = block.innerText;
            const data = JSON.parse(rawJson);
            const id = 'wavedrom-diagram-' + index;
            const container = document.createElement('div');
            container.id = id;
            const pre = block.parentElement;
            pre.parentElement.replaceChild(container, pre);
            wavedrom.renderWaveForm(index, data, 'wavedrom-diagram-');
        } catch (e) {
            console.error("Failed to parse WaveDrom block:", e);
        }
    });
});

