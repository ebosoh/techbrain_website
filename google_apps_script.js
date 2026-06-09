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

// doOptions removed as it is not supported in GAS Web Apps and caused errors.

/**
 * Run this function MANUALLY in the script editor to authorize permissions.
 * Select 'testRun' from the dropdown and click 'Run'.
 */
function testRun() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                name: "Test User",
                company: "Test Co",
                email: "hudson.eboso@techbrain.africa", // Sending to self for test
                service: "Test Service",
                date: new Date().toISOString().split('T')[0], // Today
                message: "This is a test run to authorize permissions."
            })
        }
    };

    console.log(doPost(testData).getContent());
}
