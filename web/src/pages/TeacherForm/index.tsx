import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './styles.css'

const TeacherForm = () => {

  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const initialValuesSchedule = { week_day: 0, from: '', to: ''}

  const [scheduleItems, setScheduleItems] = useState([initialValuesSchedule])

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      initialValuesSchedule
    ])
  }

  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index == position){
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  const handleCreateClass = (event: FormEvent) => {
    event.preventDefault()

    api.post('classes', {
      name,
      avatar, 
      whatsapp, 
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')
      history.push('/')
    }).catch(() => {
      alert('Erro no cadastro!')
    })

  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              label="Nome Completo" 
              name="name"
              value={name}
              onChange={(event) => { setName(event.target.value) }}
            />
            <Input 
              label="Avatar" 
              name="avatar"
              value={avatar}
              onChange={(event) => { setAvatar(event.target.value) }}
            />
            <Input 
              label="Whatsapp" 
              name="whatsapp"
              value={whatsapp}
              onChange={(event) => { setWhatsapp(event.target.value) }}
            />
            <Textarea 
              label="Biografia" 
              name="bio" 
              value={bio}
              onChange={(event) => { setBio(event.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              label="Matéria" 
              name="subject"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação Física', label: 'Educação Física' },
                { value: 'Espanhol', label: 'Espanhol' },
                { value: 'Física', label: 'Física' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Inglês', label: 'Inglês' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
                { value: 'Química', label: 'Química' },
              ]}
              value={subject}
              onChange={(event) => { setSubject(event.target.value) }}
            />
            <Input 
              label="Custo da sua hora por aula" 
              name="cost"
              value={cost}
              onChange={(event) => { setCost(event.target.value) }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, i) => {
              return(
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select  
                    label="Dia da Semana" 
                    name="week-day"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(i, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' }
                    ]}
                  />
                  <Input 
                    label="Das" 
                    name="from" 
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(i, 'from', e.target.value)} 
                  />
                  <Input 
                    label="Até" 
                    name="to" 
                    type="time" 
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(i, 'to', e.target.value)}
                  />
                </div>
              )
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br />
              Preencha todos os dados.
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
