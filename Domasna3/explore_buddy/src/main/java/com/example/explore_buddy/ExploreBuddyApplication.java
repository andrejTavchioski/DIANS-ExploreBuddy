package com.example.explore_buddy;

import com.example.explore_buddy.config.email.Mail;
import com.example.explore_buddy.config.email.MailService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class ExploreBuddyApplication {

    public static void main(String[] args) {
        Mail mail = new Mail();
        mail.setMailFrom("etnosfreelance@gmail.com");
        mail.setMailTo("viktor-tasevski@hotmail.com");
        mail.setMailSubject("Tavco smurfa");
        mail.setMailContent("ExploreBuddy > se dr");
//        SpringApplication.run(ExploreBuddyApplication.class, args);
        ApplicationContext ctx = SpringApplication.run(ExploreBuddyApplication.class, args);
        MailService mailService = (MailService) ctx.getBean("mailService");
        mailService.sendEmail(mail);
    }

}
