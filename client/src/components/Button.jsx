import PropTypes from 'prop-types'

const Button = ({ text, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className='rounded-xl uppercase font-bold text-xxs pl-3 pr-2 bg-gradient-to-r from-blue-300 to-blue-600 text-white px-2'
    >
      <span className="inline mr-1">{text}</span>
      {icon}
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
}

export default Button