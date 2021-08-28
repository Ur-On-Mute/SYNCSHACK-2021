import {QuizQuestion, Equation} from './Quiz'

function AlgebraQuestionWrapper(props) {
  return(
    <QuizQuestion
      header={props.header}
      description={props.description}
      check={props.check}
      setCheck={props.setCheck}
      answers={props.answers}
      setAnswer={props.setAnswer}
      correctAnswers={props.correctAnswers}
      answers_count={props.answers_count}
      buttonVariant={props.buttonVariant}
      >
      <Equation
        LHS={props.LHS}
        RHS={props.RHS}
        constants={props.constants}
        constant_ranges={props.constant_ranges}
        answers={props.answers}
        check={props.check}
        setCheck={props.setCheck}
        push={props.push}
        constantVals={props.constantVals}
        setConstantVals={props.setConstantVals}
        setVariant={props.setVariant}>
      </Equation>
    </QuizQuestion>
  )
}

export default AlgebraQuestionWrapper;
