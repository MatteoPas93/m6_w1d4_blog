import React from 'react'

function SuccessPage() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')
  return (
    <div>
        <div> SuccessPage</div>
        <div>
            Il tuo token: {token}</div> </div>
  )
}

export default SuccessPage