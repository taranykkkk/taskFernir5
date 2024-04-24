import styles from './Question.module.scss';
import check from '../../assets/check.svg';
import cross from '../../assets/cross.svg';
import data from '../../questions.json';
import { useState, useEffect } from 'react';

function Question() {
  const [questionCount, setQuestionCount] = useState(0);
  const [checked, setChecked] = useState([]);

  const onCheckQuestion = (i, value) => {
    if (checked[questionCount]?.selected) return;

    if (value) {
      setChecked([
        ...checked,
        { isCorrect: check, selected: true, style: styles.isTrue, id: i },
      ]);
      //   e.target.classList.add(styles.isTrue);
    } else {
      setChecked([
        ...checked,
        { isCorrect: cross, selected: true, style: styles.isFalse, id: i },
      ]);
      //   e.target.classList.add(styles.isFalse);
    }
  };

  const handlerNextClick = () => {
    checked[questionCount].style = '';
    if (questionCount === 2) {
      return;
    }
    setQuestionCount(questionCount + 1);
  };

  return (
    <div className={styles.question_wrapper}>
      <h2>Question {questionCount + 1} of 3</h2>

      <h1 className={styles.question_text}>{data[questionCount].question}</h1>
      <div className={styles.question_variant}>
        {data[questionCount].answers.map((elem, i) => (
          <span
            key={i}
            onClick={() => onCheckQuestion(i, elem.isCorrect)}
            className={
              checked[questionCount]?.id === i
                ? checked[questionCount].style
                : ''
            }>
            {elem.text}
          </span>
        ))}
      </div>
      <button onClick={handlerNextClick}>Next</button>

      <div className={styles.answers}>
        <div>{<img src={checked[0]?.isCorrect} />}</div>
        <div>{<img src={checked[1]?.isCorrect} />}</div>
        <div>{<img src={checked[2]?.isCorrect} />}</div>
      </div>
    </div>
  );
}

export default Question;
