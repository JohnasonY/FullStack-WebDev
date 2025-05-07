const PageHeader = ({text}) => <h1>{text}</h1>

const CourseHeader = (props) => {
  return (
    <>
      <h2>{ props.course }</h2>
    </>
  )   
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercisesCount}</p>
    </>
  )
}

const Content = (props) => {
  const { parts } = props
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercisesCount={part.exercises} />
      )}
      <p>total of {total} exercises</p>
    </div>
  )
}

const Course = (props) => {
  const {course} = props
  return (
    <>
      <CourseHeader course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const Courses = (props) => {
  const {pageName, courses} = props
  return (
    <>
      <PageHeader text={pageName}/>
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </>
  )
}

export default Courses