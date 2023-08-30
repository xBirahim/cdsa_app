import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, Input, Radio } from '@nextui-org/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import QRCode from 'qrcode';
import bcrypt from 'bcryptjs';
import { sendConfirmationMail } from "lib/api";
import { useRouter } from 'next/router';

const SALT_ROUNDS = 10;

export default function App({ closeModal }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [societe, setSociete] = useState('');
  const [isRevendeur, setIsRevendeur] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await sendConfirmationMail({to: email});
    } catch (error) {
      console.log(error);
    }
  }

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  const isStrongPassword = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const isValidEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      toast.error('Invalid email address.');
      return;
    }

    //if (!isStrongPassword(password)) {
    //  toast.error('Password must be at least 8 characters long and include uppercase, lowercase, digits, and special characters.');
    //  return;
    //}

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = {
      nom,
      prenom,
      login,
      email,
      password: hashedPassword,
      societe: isRevendeur ? societe : '',
      role: isRevendeur ? 'revendeur' : 'client',
    };

    try {
      const response = await axios.post(
        'https://64e3bc10bac46e480e7923a0.mockapi.io/revendeur',
        user
      );

      if (response.status === 201) {
        if (isRevendeur) {
          const qrDataURL = await QRCode.toDataURL(email);
          sendEmailWithQR(email, qrDataURL);
          router.push('/mac');
        } else {
          router.push('/productlist');
        }

        onSubmit();
        
      } else {
        toast.error('Registration failed.');
      }
      closeModal();
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

  const sendEmailWithQR = async (toEmail, qrDataURL) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/send-email',
        { toEmail, qrDataURL }
      );

      if (response.status === 200) {
        toast.success('Email sent successfully.');
      } else {
        toast.error('Failed to send email.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the email.');
    }
  };

  const handleSendEmailManually = async () => {
    const emailToSend = 'example@example.com';
    const qrCodeDataURL = 'https://example.com/qr-code.png';

    try {
      const response = await axios.post(
        'http://localhost:3001/send-email',
        { toEmail: emailToSend, qrDataURL: qrCodeDataURL }
      );

      if (response.status === 200) {
        toast.success('Email sent manually.');
      } else {
        toast.error('Failed to send email.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the email.');
    }
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={() => {
        closeModal();
        setVisible(false);
      }}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Bienvenue chez&nbsp;
          <Text b size={18}>
            PayeTonKAWA
          </Text>
          <br />
          <Text size={16}>Le Café c'est la vie</Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Name"
          value={nom}
          onChange={e => setNom(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="First Name"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Username"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <Input
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          type="password"
          clearable
          bordered
          fullWidth
          color="primary"
          size="lg"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={!isStrongPassword(password)}
        />
        {isRevendeur && (
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Company"
            value={societe}
            onChange={e => setSociete(e.target.value)}
          />
        )}
        <Radio.Group
          value={isRevendeur ? 'revendeur' : 'client'}
          onChange={value => setIsRevendeur(value === 'revendeur')}
          label="Qui êtes vous?"
          orientation="horizontal"
        >
          <Radio value="revendeur">Revendeur</Radio>
          <Radio value="client">client</Radio>
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeModal}>
          Close
        </Button>
        <Button auto onPress={handleSignIn} color="green">
          Sign in
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  );
}
