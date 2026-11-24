package ru.itmo.web;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpSession;
import ru.itmo.web.model.AreaChecker;
import ru.itmo.web.model.PointResult;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
@WebServlet("/area-check")
public class AreaCheckServlet extends HttpServlet{
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        long startTime = System.nanoTime();
        try{
            BigDecimal x = readNumber(request, "x");
            BigDecimal y = readNumber(request, "y");
            BigDecimal r = readNumber(request, "r");

            boolean fromGraph = "graph".equals(request.getParameter("source"));
            boolean yNot = y.compareTo(BigDecimal.valueOf(-3))<=0 || y.compareTo(BigDecimal.valueOf(5))>=0;
            if (!fromGraph && yNot){
                throw new IllegalArgumentException("Y вне диапазона");
            }
            boolean validR = false;
            for (String allowed : new String[]{"1", "1.5", "2", "2.5", "3"}){
                if (r.compareTo(new BigDecimal(allowed))==0){
                    validR = true;
                    break;
                }
            }
            if (!validR){
                throw new IllegalArgumentException("Некорректный R");
            }
            boolean hit = AreaChecker.checkHit(x,y,r);
            double timeScript = (System.nanoTime() - startTime) / 1_000_000.0;
            Instant timestamp = Instant.now();
            PointResult result = new PointResult(x, y, r, hit, timestamp, timeScript);
            HttpSession session = request.getSession();

            synchronized (session){
                List<PointResult> results = (List<PointResult>) session.getAttribute("results");
                if (results == null){
                    results = new ArrayList<>();
                }
                results.add(result);
                session.setAttribute("results", results);
            }
            request.setAttribute("result", result);
            request.getRequestDispatcher("/WEB-INF/views/result.jsp").forward(request, response);
        }catch (IllegalArgumentException e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Проверьте параметры X, Y и R");
        }
    }

    private BigDecimal readNumber(HttpServletRequest request, String name){
        String value = request.getParameter(name);
        if (value == null || !value.matches("[+-]?\\d+(\\.\\d+)?")){
            throw new IllegalArgumentException("Некорректный параметр");
        }
        return new BigDecimal(value);
    }
}
