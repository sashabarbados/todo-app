import { React, Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import ru from "date-fns/locale/ru";
import './task.css';

export default class Task extends Component {

   static defaultProps = {
      completed: false,
      editing: false,
   }

   static propTypes = {
      completed: PropTypes.bool,
      editing: PropTypes.bool,
      task: PropTypes.string.isRequired,
      onDeleted: PropTypes.func.isRequired
   }

   state = {
      edit: this.props.task
   }

   onEditLabelChange = (e) => {
      this.setState({
         edit: e.target.value
      })
   }

   onEditingSubmit = (e) => {
      e.preventDefault();

      if (this.state.edit.trim() === '') {
         return;
      }

      this.props.onEditingSubmit(this.state.edit);
   }

   render() {

      const { task, completed, editing, id, date, onDeleted, onToggleComplete, onToggleEditing, closeEditing } = this.props;
      let classNames = '';
      if (completed) {
         classNames += 'completed';
      }

      if (editing) {
         classNames += 'editing';
      }

      return (
         <li key={id} className={classNames}>
            {!editing
               ? (
                  <div className='view'>
                     <input className="toggle" type="checkbox" onChange={onToggleComplete} checked={completed} />
                     <label onClick={onToggleComplete}>
                        <span className="description">{task}</span>
                        <span className="created">создано {formatDistanceToNow(date, { includeSeconds: true, addSuffix: true, locale: ru })}</span>
                     </label>
                     <button
                        className="icon icon-edit"
                        onClick={onToggleEditing}></button>
                     <button
                        className="icon icon-destroy"
                        onClick={onDeleted}>
                     </button>
                  </div >
               )
               : (
                  <form onSubmit={(e) => this.onEditingSubmit(e)}>
                     <input
                        className='edit'
                        value={this.state.edit}
                        onChange={this.onEditLabelChange}
                        onBlur={onToggleEditing}
                        onKeyDown={closeEditing}
                        autoFocus
                     />
                  </form>
               )
            }
         </li>
      );
   }

}