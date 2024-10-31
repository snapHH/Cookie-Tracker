package com.example.cookietracker;

import com.example.cookietracker.CookieDetails;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cookies")
public class CookieController {

    @GetMapping("/details")
    public List<CookieDetails> getCookies(HttpServletRequest request) {
        List<CookieDetails> cookieDetailsList = new ArrayList<>();
        Cookie[] cookies = request.getCookies();
        String userAgent = request.getHeader("User-Agent");

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                CookieDetails details = new CookieDetails();
                details.setName(cookie.getName());
                details.setValue(cookie.getValue());
                details.setDomain(cookie.getDomain() != null ? cookie.getDomain() : "N/A");
                details.setPath(cookie.getPath() != null ? cookie.getPath() : "N/A");
                details.setMaxAge(cookie.getMaxAge());
                details.setBrowser(userAgent);
                details.setStorageLocation("Browser Cookie Storage");
                cookieDetailsList.add(details);
            }
        }
        return cookieDetailsList;
    }
}
