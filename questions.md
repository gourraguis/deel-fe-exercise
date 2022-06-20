# Part 2 Responses

##  What is the difference between Component and PureComponent? give an example where it might break my app.

Pure component does a shallow comparison of props/state, and only rerenders if there are any changes. This would lead to an improved performance when using pure components correctly.

An example of where using pure component would cause issues would be some like `ItemsList`, a component that takes `currentItems: string[]` as one of its props. Unless we check whether the component should update, there might be a change on the items list and it wouldn't be rendered.

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

`Context` is globally accessible, while `shouldComponentUpdate` limits the component and it's children to rerenders when there is a change in props/state. Using them together might lead to changes on context not being reflected on said component or its children.

## Describe 3 ways to pass information from a component to its PARENT.

- Pass a callback to the child that can be called to pass information to its parent.
- Use a state management library like redux, or react context to pass information regardless of the components tree.
- There must be a third way to do this, but I'm not sure what it is...

## Give 2 ways to prevent components from re-rendering.

- Usage of `React.memo()`, `React.useMemo()`, and `React.useCallback()`
- Usage of `shouldComponentUpdate()` in older class based components

## What is a fragment and why do we need it? Give an example where it might break my app.

React fragment allows us to add a virtual node to our app structure without adding an extra `<div>` into the real dom. It is useful to group multiple children in our components.

Fragments can cause issues when we have CSS with some kind of children selectors, or when using a specific css/components framework that has that kind of selectors.

## Give 3 examples of the HOC pattern
- React-redux HOC `connect` which allows us to map state and dispatch functions into the component props.
- A template HOC to style and use some given library components in our components, i.e `withTemplate(MyApp, templateConfig)`.
- An authentication HOC that can load the component content or redirect to a login or disabled page based on the logged user, i.e `WithAuth(MyRestrictedComponent)`.

## What's the difference in handling exceptions in promises, callbacks and async...await.
- Promises: exceptions are managed in the first catch handler that is on the promise chain:
```
FunctionWithPromise(arg1, arg2)
  .then(handleSuccess)
  .catch(handleError)
```
- Callbacks: exceptions are handled through a callback that is given as a paramater:
```
FunctionWithCallback(arg1, arg2, (result, error) => {
  if (error) {
    handleError(error)
    return
  }
  handleSuccess(result)
})
```
- Async/Await: a better way to handle deeply nested code without having a long promise chain or getting stuck in callback hell
```
(async () => {
  try {
    const result = await FunctionWithPromise(arg1, arg2)
    handleSuccess(result)
  } catch (error) {
    handleError(error)
  }
})()
```

##  How many arguments does setState take and why is it async
`setState` take a single argument which can be an object to be merged with the previous state, or a function that can take previous state and props to return an object that will be merged with the previous state (useful to keep the state atomic), the function format is `(state, props) => newState`.

`setState` is async because react might batch multiple calls into a single update for performance reasons.

##  List the steps needed to migrate a Class to Function Component.

- Change the class to a function, remove the constructor and replace any lifecycle methods into relevant hooks.
- Remove `render()` and put its content as the function `return` value.
- Remove all references to `this`, replace all methods with normal functions and deconstruct props at the start of the function component.
- Fix any potential bugs or styling issues, test the component to ensure it's still functional.

## List a few ways styles can be used with components.
- Regular CSS along with inline styles: The simplest approach, useful for smaller project or 1 line properties but very hard to scale
- CSS modules: A modular approach that is better than regular css to keep a clean global scope and avoid long class names
- CSS in JS: An approach that tries to keep everything in JS, using a library like `styled-components`. With this we have both our html and css code inside our jsx.
- SASS/LESS: CSS extensions that add syntastic sugar to make the developer experience better with CSS, most modern CSS or components library use this approach (Bulma uses SASS, Antd uses LESS), and I think it's the best way for a complex codebase.

# How to render an HTML string coming from the server.
```
const htmlString = await getHtmlStringFromServer()
return (
  <div dangerouslySetInnerHTML={{ _html: htmlString }} />
)
```