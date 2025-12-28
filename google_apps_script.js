function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const { name, company, email, service, date, message } = data;

        // 1. Send Email Notification
        const subject = `New TechBrain Demo Request: ${name}`;
        const body = `
      New Booking Request received:
      
      Name: ${name}
      Company: ${company}
      Email: ${email}
      Service: ${service}
      Preferred Date: ${date}
      Message: ${message}
      
      --
      TechBrain AI Website
    `;

        MailApp.sendEmail({
            to: "hudson.eboso@techbrain.africa",
            subject: subject,
            body: body,
            replyTo: email
        });

        // 2. Add to Google Calendar
        if (date) {
            const calendar = CalendarApp.getDefaultCalendar();
            const eventDate = new Date(date);
            // Set time to 10 AM default or parse if time provided. Assuming full day or specific slot.
            // For now, creating an all-day event or 1-hour meeting.
            eventDate.setHours(10, 0, 0);
            const endTime = new Date(eventDate);
            endTime.setHours(11, 0, 0);

            calendar.createEvent(`Demo: ${name} (${company})`, eventDate, endTime, {
                description: `Service: ${service}\nEmail: ${email}\nMessage: ${message}`
            });
        }

        return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Request processed' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function doOptions(e) {
    // Handle CORS for preflight requests
    return ContentService.createTextOutput("")
        .setMimeType(ContentService.MimeType.TEXT)
        .appendHeader("Access-Control-Allow-Origin", "*")
        .appendHeader("Access-Control-Allow-Methods", "POST")
        .appendHeader("Access-Control-Allow-Headers", "Content-Type");
}
