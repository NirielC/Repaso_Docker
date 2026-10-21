import { useEffect, useState } from 'react'
import './App.css'

// Cambia esto para la Guía 2 (Ejercicio 2): v1 -> v2, construyes y subes la nueva versión
const VERSION = 'v2'

const CLAVE = 'contactos'

function cargarContactos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? []
  } catch {
    return []
  }
}

function App() {
  const [contactos, setContactos] = useState(cargarContactos)
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' })

  // Cada vez que cambia la lista, se guarda en localStorage
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(contactos))
  }, [contactos])

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function agregar(e) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.correo.trim() || !form.telefono.trim()) return
    setContactos([...contactos, { id: Date.now(), ...form }])
    setForm({ nombre: '', correo: '', telefono: '' })
  }

  function eliminar(id) {
    setContactos(contactos.filter((c) => c.id !== id))
  }

  return (
    <main className="app">
      <header>
        <h1>Contact Manager</h1>
        <span className="version">{VERSION}</span>
      </header>

      <form onSubmit={agregar}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={cambiar} />
        <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={cambiar} />
        <input name="telefono" type="tel" placeholder="Teléfono" value={form.telefono} onChange={cambiar} />
        <button type="submit">Agregar</button>
      </form>

      {contactos.length === 0 ? (
        <p className="vacio">Todavía no hay contactos.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>{c.telefono}</td>
                <td>
                  <button className="eliminar" onClick={() => eliminar(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}

export default App
