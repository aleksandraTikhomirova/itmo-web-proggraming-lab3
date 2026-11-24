package ru.itmo.web.model;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
public class PointResult implements Serializable {
    private final BigDecimal x;
    private final BigDecimal y;
    private final BigDecimal r;
    private final boolean hit;
    private final Instant timestamp;
    private final double timeScript;

    public PointResult(BigDecimal x, BigDecimal y, BigDecimal r, boolean hit, Instant timestamp, double timeScript){
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.timestamp = timestamp;
        this.timeScript = timeScript;
    }

    public BigDecimal getX(){
        return x;
    }
    public BigDecimal getY(){
        return y;
    }
    public BigDecimal getR(){
        return r;
    }
    public boolean isHit(){
        return hit;
    }
    public Instant getTimestamp(){
        return timestamp;
    }
    public double getTimeScript(){
        return timeScript;
    }

}
