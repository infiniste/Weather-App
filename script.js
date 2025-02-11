document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "8d563c85657b292cfb66f635a721fe09"; // 🔑 OpenWeather API 키 입력
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const weatherResult = document.getElementById("weather-result");
    const body = document.body; // 배경 변경용

    searchBtn.addEventListener("click", function () {
        const city = cityInput.value.trim();
        if (city === "") {
            alert("도시 이름을 입력하세요!");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
        console.log("📡 API 요청 URL:", apiUrl);

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API 오류 발생: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("✅ API 응답 데이터:", data);
                if (data.cod === "404") {
                    alert("도시를 찾을 수 없습니다. 다시 입력하세요.");
                    return;
                }

                // 🌎 날씨 정보 표시
                cityName.textContent = `${data.name}, ${data.sys.country}`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                temperature.textContent = `🌡️ 온도: ${data.main.temp}°C`;
                description.textContent = `☁️ 상태: ${data.weather[0].description}`;
                humidity.textContent = `💧 습도: ${data.main.humidity}%`;

                // 💡 UI 부드러운 등장 효과
                weatherResult.classList.add("show");

                // 🎨 배경색 변경 (날씨에 따라)
                changeBackground(data.weather[0].main);
            })
            .catch(error => console.error("🚨 Error fetching weather data:", error));
    });

    // 🔄 날씨에 따라 배경 색상 변경
    function changeBackground(weatherCondition) {
        let backgroundColor;
        switch (weatherCondition.toLowerCase()) {
            case "clear":
                backgroundColor = "linear-gradient(135deg, #ffcc00, #ff9966)"; // 맑음 (노랑~오렌지)
                break;
            case "clouds":
                backgroundColor = "linear-gradient(135deg, #d3d3d3, #a9a9a9)"; // 흐림 (회색)
                break;
            case "rain":
                backgroundColor = "linear-gradient(135deg, #4b79a1, #283e51)"; // 비 (파란색)
                break;
            case "snow":
                backgroundColor = "linear-gradient(135deg, #ffffff, #dfe9f3)"; // 눈 (하얀색)
                break;
            case "thunderstorm":
                backgroundColor = "linear-gradient(135deg, #3a1c71, #d76d77)"; // 뇌우 (보라~핑크)
                break;
            default:
                backgroundColor = "linear-gradient(135deg, #89f7fe, #66a6ff)"; // 기본 (파란색)
        }
        body.style.background = backgroundColor;
    }
});
