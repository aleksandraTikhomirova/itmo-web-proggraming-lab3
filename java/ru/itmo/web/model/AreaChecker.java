package ru.itmo.web.model;
import java.math.BigDecimal;
public class AreaChecker {
        public static boolean checkHit(BigDecimal x, BigDecimal y, BigDecimal r){
            BigDecimal zero = BigDecimal.ZERO;
            BigDecimal halfR = r.divide(BigDecimal.valueOf(2));
            BigDecimal x2 = x.multiply(x);
            BigDecimal y2 = y.multiply(y);

            boolean rectangle =
                    x.compareTo(r.negate()) >= 0 &&
                    x.compareTo(zero) <=0 &&
                    y.compareTo(r.negate()) >=0 &&
                    y.compareTo(zero) <=0;
            boolean circle =
                    x.compareTo(zero)<=0 &&
                    y.compareTo(zero)>=0 &&
                    (x2.add(y2)).compareTo(halfR.multiply(halfR)) <=0;
            boolean triangle =
                    x.compareTo(zero)>=0 &&
                    y.compareTo(zero)>=0 &&
                    (x.add(y)).compareTo(r) <=0;
            return rectangle || circle || triangle ;

        }
}
