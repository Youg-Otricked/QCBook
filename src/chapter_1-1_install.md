# Installation

To install C^4, first you should install the package and version manager, `qcm`. This is because C^4 is ever expanding, and thus updating your version will be constant.

To install `qcm`:

<details>
    <summary>Linux</summary>
    <details>
        <summary>Debian</summary>
        <p>Run this command. (Must have jq installed)</p>
        <pre><code>curl -s https://api.github.com/repos/Youg-Otricked/quartic-c-manager/releases/latest | jq -r '.assets[].browser_download_url | select(endswith(".deb"))' | xargs curl -OL
    sudo apt install ./qcm_*.deb
    qcm setup</code></pre>
    </details>
    <details>
        <summary>Else</summary>
        <p>Run this command in your terminal.</p>
        <code>curl -L "https://github.com/Youg-Otricked/quartic-c-manager/releases/latest/download/qcm-linux" -o ./qcm && chmod +x ./qcm && ./qcm setup</code>
    </details>
</details>
<details>
    <summary>MacOS</summary>
    <p>Run this command in your terminal.</p>
    <code>curl -L "https://github.com/Youg-Otricked/quartic-c-manager/releases/latest/download/qcm-macos" -o ./qcm && chmod +x ./qcm && ./qcm setup</code>
</details>
<details>
    <summary>Windows</summary>
    <p>C^4 does not nor intends to support windows. If you would like to use it, use WSL or compile the compiler from source.</p>
</details>

###### A Webi script is currently awaiting approval to make this process significantly easier.

Now, to install qc, just run 
```bash
qcm tooling install latest
```
