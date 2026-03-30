// --- Digital Clock Logic ---
function updateClock() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    
    // 01, 02 වැනි ලෙස පෙන්වීමට 0 එකතු කිරීම
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    document.getElementById("clock").innerHTML = `${h}:${m}:${s}`;
    
    // දිනය පෙන්වීම
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("date").innerHTML = now.toLocaleDateString(undefined, options);
}

setInterval(updateClock, 1000); // සෑම තත්පරයකටම ක්‍රියාත්මක වේ
updateClock(); // මුලින්ම වරක් run කිරීම

// --- Timer Logic ---
let timerInterval;
let totalSeconds = 0;

function startTimer() {
    const minInput = document.getElementById("minutes").value;
    const secInput = document.getElementById("seconds").value;

    // තත්පර ගණන ගණනය කිරීම
    if (totalSeconds === 0) {
        totalSeconds = (parseInt(minInput) || 0) * 60 + (parseInt(secInput) || 0);
    }

    if (totalSeconds <= 0) {
        alert("Please set a time!");
        return;
    }

    clearInterval(timerInterval); // කලින් එකක් තිබේ නම් නතර කිරීම
    
    timerInterval = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay();

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time's Up!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    updateTimerDisplay();
}

function updateTimerDisplay() {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    
    document.getElementById("timer-display").innerHTML = `${mins}:${secs}`;
}