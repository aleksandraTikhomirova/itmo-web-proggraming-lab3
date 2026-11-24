<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCType html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Результат проверки</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<script defer src="${pageContext.request.contextPath}/js/time.js"></script>
<body>
<main>
    <section>
        <h1>Результат проверки точки</h1>
        <table id="results-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Дата и время</th>
                <th>Время обработки</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><c:out value="${requestScope.result.x}"/></td>
                <td><c:out value="${requestScope.result.y}"/></td>
                <td><c:out value="${requestScope.result.r}"/></td>
                <td>
                    ${requestScope.result.hit ? 'Попадание' : 'Промах'}
                </td>
                <td><time datetime="${requestScope.result.timestamp}">${requestScope.result.timestamp}</time></td>
                <td>${requestScope.result.timeScript}</td>
            </tr>
            </tbody>
        </table>

        <p>
            <a href="${pageContext.request.contextPath}/controller">
                Проверить точку
            </a>
        </p>
    </section>
</main>
</body>
</html>

