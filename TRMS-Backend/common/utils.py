STUDENT = 1
TEACHER = 2
SECRETARY = 3
SUPERVISOR = 4
ADMIN = 5
PARENT = 6
STUDENT = 7

USER_TYPE_CHOICES = (
    (STUDENT, 'student'),
    (TEACHER, 'teacher'),
    (SECRETARY, 'secretary'),
    (SUPERVISOR, 'supervisor'),
    (PARENT, 'parent'),
    (STUDENT, 'student'),
    (ADMIN, 'admin'),
)

POLYCY_TYPE_CHOICES= (
    ('THUONG', 'THUONG'),
    ('PHAT', 'PHAT')
)

EMULATION_TYPE_CHOICES= (
    ('Thưởng', 'Thưởng'),
    ('Phạt', 'Phạt')
)


PARENT_TYPE_CHOICES = (
    ('CHA', 'CHA'),
    ('ME', 'ME'),
    ('ANH_EM', 'ANH_EM'),
    ('CHI_EM', 'CHI_EM'),
    ('KHAC', 'KHAC')
)

TEACHER_GROUP_CHOICE = (
    ('COHUU', 'COHUU'),
    ('THINHGIANG', 'THINHGIANG'),
    ('VANPHONG', 'VANPHONG'),
)

SMS_MESSAGE_STATUS = (
    ('CHUA_GUI', 'CHUA_GUI'),
    ('DANG_XULY', 'DANG_XULY'),
    ('XULY_THANHCONG', 'XULY_THANHCONG'),
    ('BRANDNAME_KHONG_TONTAI', 'BRANDNAME_KHONG_TONTAI'),
    ('LOAI_TINNHAN_KHONG_HOPLE', 'LOAI_TINNHAN_KHONG_HOPLE'),
    ('KHONG_DU_SOLUONG', 'KHONG_DU_SOLUONG'),
    ('QUA_DODAI_TOIDA', 'QUA_DODAI_TOIDA'),
    ('KHONG_COQUYEN_GUI_TINNHAN','KHONG_COQUYEN_GUI_TINNHAN'),
    ('LOI_KHONG_XACDINH','LOI_KHONG_XACDINH'),
)

ROLL_CALL_ERROR_CHOICES = (
    ('MUON','MUON'),
    ('PHEP','PHEP'),
    ('KHONGPHEP','KHONGPHEP'),
)
GENDER = (
    ('Nam', 'Nam'),
    ('Nu', 'Nu'),
)