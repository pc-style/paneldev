
var definedStats = [];

const genStat = (statName, statValue, statText, statIcon) => {
    const statElement = document.getElementById(statName);

    if (statText) {
        statText = statText.replace('%red', '<element style="color: var(--text-color-red)">')
        statText = statText.replace('%g', '<element style="color: var(--text-color-2)">')
        statText = statText.replace('%r', '</element>')
    }

    var statColor = "green"
    var progress;

    if (statValue) {
        if (statValue >= 40) statColor = 'orange';
        if (statValue > 80) statColor = 'red'
    }

    if (!statElement) {
        const _stat = document.createElement('div')
        _stat.id = statName;
        _stat.className = "stat";

        const _split = document.createElement('div');
        _split.className ='split';

        const _icon = document.createElement('span');
        _icon.className = 'material-symbols-outlined';
        _icon.innerHTML = statIcon;

        const _holder = document.createElement('div');

        const _value = document.createElement('div');
        _value.className = 'value';
        _value.id = `${statName}.value`;
        _value.innerHTML = statText;

        const _progressbar = document.createElement('div');
        _progressbar.className = 'progressbar';

        const _progress = document.createElement('div')
        _progress.className = 'progress';
        _progress.id = `${statName}.progress`
        _progress.style.width = `${statValue}%`;

        _progressbar.appendChild(_progress);
        _holder.appendChild(_value);
        if (statValue != -1) _holder.appendChild(_progressbar);
        _split.appendChild(_icon)
        _split.appendChild(_holder);
        _stat.appendChild(_split);

        document.getElementById('stats').appendChild(_stat);

        definedStats.push(statName);
        progress = _progress;
    } else {
        progress = document.getElementById(`${statName}.progress`);
        value = document.getElementById(`${statName}.value`);

        if (!progress) return;
        else console.log("AA")

        if (statValue) progress.style.width = statValue + "%";
        if (statText) value.innerHTML = statText;
    }

    progress.style.background = `var(--text-color-${statColor})`
}

genStat('status', '-1', "STATUS SERWERA<br>%redOFFLINE%r", 'power_settings_new');
genStat('ping', '-1', "PING GRACZY<br>%gbrak danych%r", 'network_ping');
genStat('players', '-1', "ILOŚĆ GRACZY<br>%gbrak danych%r", 'group');

genStat('cpu', '0', "UŻYCIE CPU<br>%g0%%r", 'memory');
genStat('memory', '0', "PAMIĘĆ RAM<br>%g0/6GB%r", 'memory_alt');
genStat('storage', '0', "MIEJSCE NA DYSKU<br>%g0/30G%r", 'storage');
genStat('bandwidth', '0', "PRZEPUSTOWOŚĆ<br>%g0/20Mb%r", 'cloud');

setInterval(() => {
    definedStats.forEach((elm) => {
        let random = Math.floor(Math.random() * 100)
        genStat(elm, random)
    })
}, 3000)