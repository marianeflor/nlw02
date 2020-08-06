import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Select from '../../components/Select'

import api from '../../services/api'

import './styles.css'

const TeacherList = () => {

  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">

        <form action="" id="search-teachers" onSubmit={searchTeachers}>
          <Select  
            label="Matéria" 
            name="subject"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
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
          />
          <Select  
            label="Dia da Semana" 
            name="week-day"
            value={weekDay}
            onChange={e => { setWeekDay(e.target.value) }}
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
            label="Hora" 
            name="time" 
            type="time" 
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />
          
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}        
      </main>
    </div>
  )
}

export default TeacherList
