<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>ВЕБ Лабораторная работа №3</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<script defer src="${pageContext.request.contextPath}/js/time.js"></script>
<body>
    <header id="main-header">
        <div class="header-content">
            <h1>Лабораторная работа №3 по веб-программированию</h1>
            <p><span class="label">Тихомирова Александра Евгеньевна</span></p>
            <p><span class="label">группа P3207</span></p>
            <p><span class="label">вариант 74415</span></p>
        </div>
    </header>
    <main>
        <section id="form-section">
            <h2>Введите координаты точки</h2>
            <form id="point-form" action="${pageContext.request.contextPath}/controller" method="get">
                <div class="form-group">
                    <label class="field-label">Выберите X</label>
                    <div class="button-group" id="x-group">
                        <button type="button" class="x-button" value="-2">-2</button>
                        <button type="button" class="x-button" value="-1.5">-1.5</button>
                        <button type="button" class="x-button" value="-1">-1</button>
                        <button type="button" class="x-button" value="-0.5">-0.5</button>
                        <button type="button" class="x-button" value="0">0</button>
                        <button type="button" class="x-button" value="0.5">0.5</button>
                        <button type="button" class="x-button" value="1">1</button>
                        <button type="button" class="x-button" value="1.5">1.5</button>
                        <button type="button" class="x-button" value="2">2</button>
                    </div>
                    <input type="hidden" id="x-input" name="x">
                    <span class="validation-error" id="x-error"></span>
                </div>

                <div class="form-group">
                    <label class="field-label" for="y-input">Введите Y (-3 до 5)</label>
                    <input type="text" id="y-input" name="y">
                    <span class="validation-error" id="y-error"></span>
                </div>

                <div class="form-group">
                    <label class="field-label" for="r-select">Выберите R</label>
                    <select id="r-select" name="r">
                        <option value="">Выберите радиус</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                    </select>
                    <span class="validation-error" id="r-error"></span>
                </div>

                <div class="form-actions">
                    <button type="submit" id="submit-btn">Проверить попадание</button>
                </div>
                <p id="request-error" class="validation-error" role="alert"></p>
            </form>
        </section>

        <section id="canvas-section">
            <h2>Координатная плоскость</h2>
            <div class="canvas-wrapper">
                <canvas id="graph-canvas" width="500" height="500"></canvas>
            </div>
        </section>

        <section id="results-section">
            <h2>История проверок</h2>
            <div class="table-wrapper">
                <table id="results-table">
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>результат</th>
                            <th>Дата и время</th>
                            <th>Время обработки</th>
                        </tr>
                    </thead>
                    <tbody id="results-body">
                        <c:forEach var="point" items="${sessionScope.results}">
                            <tr data-x="${point.x}" data-y="${point.y}"
                                data-r="${point.r}" data-hit="${point.hit}">
                                <td><c:out value="${point.x}"/></td>
                                <td><c:out value="${point.y}"/></td>
                                <td><c:out value="${point.r}"/></td>
                                <td>${point.hit ? 'Попадание' : 'Промах'}</td>
                                <td><time datetime="${point.timestamp}">${point.timestamp}</time></td>
                                <td>${point.timeScript}</td>
                            </tr>
                        </c:forEach>
                    </tbody>
                </table>
            </div>
            <c:if test="${empty sessionScope.results}">
                <p class="info-message">Нет сохранённых результатов</p>
            </c:if>
        </section>
    </main>
    <script src="${pageContext.request.contextPath}/js/script.js"></script>
</body>
</html>