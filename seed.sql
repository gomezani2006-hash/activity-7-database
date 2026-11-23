INSERT INTO records(title,category,description,status)
SELECT s.title,s.category,s.description,s.status FROM (VALUES
('Unable to connect to campus Wi-Fi','Network','My laptop detects the campus network but fails to connect after entering the password.','Pending'),
('Computer lab printer not responding','Printing','The printer in the computer lab receives jobs but does not print any pages.','In progress'),
('Install Python development tools','Software','I need the approved Python tools installed for my programming practicals.','Completed'),
('Student portal password reset','Account Access','I cannot sign in to the student portal because my password is no longer accepted.','Pending'),
('Keyboard keys not working','Hardware','Several keys on the desktop keyboard in Lab 2 do not respond when pressed.','In progress'),
('Browser keeps closing','Software','The browser closes unexpectedly when I open multiple learning pages.','Pending'),
('Network cable is damaged','Network','The Ethernet cable at workstation 14 appears damaged and disconnects frequently.','Completed'),
('Request access to course folder','Account Access','Please help me get access to the shared folder containing course materials.','In progress')
) AS s(title,category,description,status) WHERE NOT EXISTS(SELECT 1 FROM records);
