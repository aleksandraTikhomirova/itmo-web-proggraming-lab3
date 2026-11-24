document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("point-form");
    const xInput = document.getElementById("x-input");
    const yInput = document.getElementById("y-input");
    const rSelect = document.getElementById("r-select");
    const xButtons = document.querySelectorAll(".x-button");

    const canvas = document.getElementById("graph-canvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width/2;
    const centerY = canvas.height/2;
    const scale = 60;
    const px = x => centerX + x*scale;
    const py = y => centerY - y*scale;

    function drawGraph(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        if (rSelect.value!== ""){
            const r = Number(rSelect.value);
            ctx.fillStyle = "#3399ff";
            //rect
            ctx.fillRect(px(-r), py(0), r*scale, r*scale);
            //triangle
            ctx.beginPath();
            ctx.moveTo(px(0),py(0));
            ctx.lineTo(px(r),py(0));
            ctx.lineTo(px(0),py(r));
            ctx.closePath();
            ctx.fill();
            //circle
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, (r/2)*scale, Math.PI, 1.5*Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        //оси
        const right = canvas.width - 8;
        const top = 8;
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        //х
        ctx.moveTo(0, centerY);
        ctx.lineTo(right, centerY);
        ctx.moveTo(right - 8, centerY - 4);
        ctx.lineTo(right, centerY);
        ctx.lineTo(right - 8, centerY + 4);
        //у
        ctx.moveTo(centerX, canvas.height);
        ctx.lineTo(centerX, top);
        ctx.moveTo(centerX - 4, top + 8);
        ctx.lineTo(centerX, top);
        ctx.lineTo(centerX + 4, top + 8);
        ctx.stroke();

        ctx.fillStyle = "#333";
        ctx.font = "14px serif";
        ctx.textAlign = "left";
        ctx.fillText("x", right - 10, centerY - 10);
        ctx.fillText("y", centerX + 10, top + 10);

        if (rSelect.value !== "") {
            const r = Number(rSelect.value);
            const marks = [
                [-r, "-R"],
                [-r / 2, "-R/2"],
                [r / 2, "R/2"],
                [r, "R"]
            ];

            for (const [value, label] of marks) {
                ctx.beginPath();
                ctx.moveTo(px(value), centerY - 3);
                ctx.lineTo(px(value), centerY + 3);
                ctx.moveTo(centerX - 3, py(value));
                ctx.lineTo(centerX + 3, py(value));
                ctx.stroke();

                ctx.textAlign = "center";
                ctx.fillText(label, px(value), centerY - 8);

                ctx.textAlign = "left";
                ctx.fillText(label, centerX + 8, py(value) + 4);
            }

            drawPoints(r);
        }
    }

    rSelect.addEventListener("change", drawGraph);
    drawGraph();

    canvas.addEventListener("click", (event) =>{
        const rError = document.getElementById("r-error");
        const requestError = document.getElementById("request-error");
        requestError.textContent = "";
        if (rSelect.value === ""){
            rError.textContent = "Чтобы выбрать точку на графике, выберите R!";
            return;
        }
        rError.textContent = "";
        const bounds = canvas.getBoundingClientRect();
        const pixelX = (event.clientX-bounds.left)*canvas.width/bounds.width;
        const pixelY = (event.clientY-bounds.top)*canvas.height/bounds.height;
        const x = (pixelX - centerX)/scale;
        const y = (centerY - pixelY)/scale;
        const url = new URL(form.action);
        url.searchParams.set("x",x);
        url.searchParams.set("y",y);
        url.searchParams.set("r",rSelect.value);
        url.searchParams.set("source","graph");
        window.location.assign(url.href);

    });

    function drawPoints(r){
        const rows = document.querySelectorAll("#results-body tr[data-x]");
        for (const row of rows){
            const pointR = Number(row.dataset.r);
            if (pointR!==r){
                continue;
            }
            const x = Number(row.dataset.x);
            const y = Number(row.dataset.y);
            const hit = row.dataset.hit === "true";
            ctx.fillStyle = hit ? "green": "red";
            ctx.beginPath();
            ctx.arc(px(x), py(y), 4,0,2*Math.PI);
            ctx.fill();
        }
    }


    xButtons.forEach((button)=>{
        button.addEventListener("click", () =>{
            xInput.value = button.value;
            xButtons.forEach((item) =>{
                item.classList.remove("selected");
            });
            button.classList.add("selected");
            document.getElementById("x-error").textContent = "";
        });
    });

    form.addEventListener("submit", (event) =>{
        const yError = document.getElementById("y-error");
        yError.textContent = "";
        document.getElementById("x-error").textContent = "";
        document.getElementById("r-error").textContent = "";
        if (xInput.value === ""){
            document.getElementById("x-error").textContent="Выберите X";
            event.preventDefault();
        }
        if (rSelect.value === ""){
            document.getElementById("r-error").textContent="Выберите R";
            event.preventDefault();
        }
        const yText = yInput.value.trim().replace(",", ".");
        if (yText === ""){
            yError.textContent = "Введите Y";
            event.preventDefault();
        }else if (!/^[+-]?\d+(\.\d+)?$/.test(yText)){
            yError.textContent = "Y должен быть числом";
            event.preventDefault();
        }else {
            const y = Number(yText);
            if (!Number.isFinite(y) || y<=-3 || y>=5){
                yError.textContent = "Y должен быть в интервале (-3;5)";
                event.preventDefault();
            }else{
                yInput.value = yText;
            }
        }



    });

});