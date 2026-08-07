-- =============================================
-- Sample Users
-- =============================================

INSERT INTO Users
(Username, Password, FullName, Role)
VALUES
('admin','admin123','System Administrator','Administrator');

-- =============================================
-- Sample Assets
-- =============================================

INSERT INTO Assets
(AssetName, Category, SerialNumber, Status, Location)

VALUES

('Dell Latitude 7440','Laptop','DL7440-001','Available','New York'),

('Cisco Catalyst 9300','Switch','C9300-002','In Use','Chicago'),

('HP LaserJet Pro','Printer','HP-LJ-003','Available','Miami'),

('Dell 27 Monitor','Monitor','MON-004','Assigned','Dallas'),

('Aruba AP-515','Wireless','AP515-005','Installed','Seattle');