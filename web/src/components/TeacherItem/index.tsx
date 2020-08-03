import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img 
          src="https://img2.pngio.com/avatar-female-person-profile-user-website-woman-icon-female-avatar-png-512_512.png" 
          alt="Avatar, female, person, profile, user, website, woman icon"
        />
        <div>
          <strong>Ana Silva</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br/><br/>
        Apaixnada por explodir coisas.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem
