import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';

const PaymentContent = () => {
  const [showForm, setShowForm] = useState(false); // حالة لإظهار الفورم
  const [studentName, setStudentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // حالة لرسالة الخطأ
  const [messageDeleted, setMessageDeleted] = useState(false); // حالة لعملية الحذف

  // دالة لمعالجة النقر على زر "تأكيد"
  const handleApprove = () => {
    setShowForm(true); // عرض الفورم عند الضغط على "تأكيد"
  };

  // دالة لمعالجة تقديم الفورم
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // التحقق من الحقول
    if (!studentName || !courseName) {
      setErrorMessage('يرجى إدخال اسم الطالب واسم الكورس'); // عرض رسالة خطأ إذا كانت الحقول فارغة
    } else if (!/^[A-Za-z]+$/.test(studentName) || !/^[A-Za-z]+$/.test(courseName)) {
      setErrorMessage('الرجاء إدخال حروف فقط في اسم الطالب واسم الكورس'); // التحقق من الحروف فقط
    } else {
      setErrorMessage(''); // clear error message if valid
      alert(`Student name: ${studentName}\nCourse name: ${courseName}`);
      // هنا يمكنك إرسال البيانات إلى الخادم أو معالجتها حسب الحاجة
    }
  };

  // دالة لحذف الرسالة من قاعدة البيانات
  const handleCancel = () => {
    // قم بإرسال طلب لحذف البيانات من قاعدة البيانات
    fetch('/api/deleteMessage', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentName, courseName }), // أرسل بيانات الرسالة
    })
      .then((response) => {
        if (response.ok) {
          setMessageDeleted(true); // قم بتعيين الحالة إذا تم الحذف بنجاح
          setShowForm(false); // إخفاء الفورم بعد الحذف
          setStudentName(''); // مسح البيانات بعد الحذف
          setCourseName('');
        } else {
          alert('فشل الحذف');
        }
      })
      .catch((error) => {
        alert('حدث خطأ أثناء الحذف');
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '20vh' }}>
      <Row className="chat-box p-4 bg-white shadow rounded" style={{ maxWidth: '800px' }}>
        <Col className="text-center">
          <div className="message mb-4">
            <img
              src="https://zaetoon.hsoubcdn.com/helpdesk/3/images/72e2b3f3-8daf-466f-859c-aa87d8116237.png"
              alt="Message Image"
              className="img-fluid rounded mb-4"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="buttons">
            <Button variant="success" className="mx-2" style={{ fontSize: '18px', padding: '12px 30px' }} onClick={handleCancel}>
              إلغاء
            </Button>
            <Button variant="danger" className="mx-2" style={{ fontSize: '18px', padding: '12px 30px' }} onClick={handleApprove}>
              تأكيد
            </Button>  
          </div>

          {showForm && (
            <Form onSubmit={handleSubmit} className="mt-4">
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* عرض رسالة الخطأ إذا كانت الحقول فارغة */}
              
              <Form.Group controlId="formStudentName">
                <Form.Label>اسم الطالب</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="أدخل اسم الطالب"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCourseName">
                <Form.Label>اسم الكورس</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="أدخل اسم الكورس"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required 
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                إرسال
              </Button>
            </Form>
          )}

          {messageDeleted && (
            <Alert variant="success" className="mt-4">
              تم مسح الرسالة بنجاح من قاعدة البيانات.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentContent;
