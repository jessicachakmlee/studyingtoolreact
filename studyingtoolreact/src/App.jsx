import * as React from "react";
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    align-items: center;
`;

const PageTitle = styled.div`
    flex: 1;
    background-image: url("/image/abstract-astro-astronomy-956999.jpg");
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 35px;
    flex: 10;
`;

const QuestionBank = styled.div`
    display: flex;
    overflow: auto;
    flex-direction: column;
`;

const QuestionBankLabel = styled.h2`
    text-align: center;
    border: 1px solid;
    background: darkseagreen;
`;

const QuestionDisplayed = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

const QuestionShowSpan = styled.span`
    align-self: flex-end;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
`;

const QuestionAnswerContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const QuestionAnswerDiv = styled.div`
    flex: 1;
`;

const QATitle = styled.h2`
    margin-right: 10px;
    text-align: center;
    border: 1px solid;
`;

const QAContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`;

const QuestionShow = styled.div`
    min-width: 90%;
    height: 250px;
    padding: 20px;
    border: 3px dashed cornflowerblue;
    overflow: auto;
`;

const buttonDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const NextQuestionButton = styled.button`
    background: cornflowerblue;
    color: white;
    font-size: 16px;
    font-weight: 700;
    width: 50%;
    height: 50px;
    align-self: center;
    
    :hover {
    background: skyblue;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

const DeleteQuestionButton = styled.button`
    background: palevioletred;
    color: white;
    font-size: 10px;
    font-weight: 700;
    width: 100px;
    height: 25px;
    align-self: flex-end;
    
    :hover {
    background: lightpink;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

const AnswerDiv = styled.div`
    flex: 1;
`;

const AnswerTextDiv = styled.div`
    min-width: 90%;
    height: 250px;
    padding: 20px;
    border: 3px dashed cornflowerblue;
`;

const AnswerText = styled.span`
    display: block;
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    overflow: auto;
    height: 250px;
`;


const ShowAnswerButton = styled.button`
    background: ${props => props.show ? 'palevioletred' : 'cornflowerblue'};
    color: white;
    font-size: 16px;
    font-weight: 700;
    width: 50%;
    height: 50px;
    align-self: center;
    
    :hover {
    background: ${props => props.show ? 'lightpink' : 'skyblue'};
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

const QuestionSubmission = styled.div`
    display: flex;
    flex-direction: column;
`;

const QuestionSubmissionDiv = styled.div`
    display: flex;
`;

const QuestionSubmissionTitle = styled.h2`
    text-align: center;
    border: 1px solid;
    margin-top: 57px;
    background: darkseagreen;
`;

const QSubmissionForm = styled.form`
    display: flex;
    flex-direction: column;
    border: 3px dashed darkseagreen;
    padding: 10px;
`;

const QAlabel = styled.label`
    flex: 1;
    margin-left: 10px;
`;

const QSubmissiontextarea = styled.textarea`
    flex: 4;
`;

const InputDiv = styled.div`
    margin-top: 10px;
    align-self: flex-end;
`;

const StyledInput = styled.input`
    background: darkseagreen;
    width: 100px;
    height: 25px;
    
    :hover {
    background: yellowgreen;
    }
    
    :focus{
    outline: 0px solid transparent;
    }
`;

interface
AppState
{
    QAPair: [];
    AnswerShown: boolean;
    randomNumber: number;
    TextAreaQuestion: string;
    TestAreaAnswer: string
}


class App extends React.Component<AppState> {
    constructor(props) {
        super(props);
        this.state = {
            QAPair: [{Question: "SampleQuestion1", Answer: "Answer1"}, {
                Question: "SampleQuestion2",
                Answer: "Answer2",
            }],
            AnswerShown: false,
            randomNumber: 0,
            TextAreaQuestion: '',
            TextAreaAnswer: ''
        };
    }

    randomNumber = () => {
        return Math.floor(Math.random() * Object.entries(this.state.QAPair).length);
    };

    randomize = () => {
        this.setState({
            AnswerShown: false,
            randomNumber: this.randomNumber()
        });
    };

    deleteQuestion = (index) => {
        let currentList = [...this.state.QAPair];
        let numberchange = this.state.randomNumber === index ? 0 : this.state.randomNumber;
        currentList.splice(index, 1);
        this.setState({
            QAPair: currentList,
            randomNumber: numberchange
        })
    }

    showAnswer = () => {
        this.setState((prevState) => {
            return {AnswerShown: !prevState.AnswerShown}
        });
    };


    handleChangeQuestion = (event) => {
        this.setState({
            TextAreaQuestion: event.target.value
        })
    }

    handleChangeAnswer = (event) => {
        this.setState({
            TextAreaAnswer: event.target.value
        })
    }

    handleSubmit = (event) => {
        if(this.state.QAPair.findIndex(x => x.Question === this.state.TextAreaQuestion) !== -1){
            alert('Question already Submitted. Please submit another unique Question.');
            event.preventDefault();
        } else {
        alert('Submitted!');
        let temp = {};
        temp["Question"] = this.state.TextAreaQuestion;
        temp["Answer"] = this.state.TextAreaAnswer;
        this.setState((prevState) => {
            return {QAPair: [...prevState.QAPair, temp]}
        })
        event.preventDefault();}
    }

    render() {
        console.log(this.state.QAPair);
        const QAPairShown = this.state.QAPair[this.state.randomNumber];
        const QuestionShown = this.state.QAPair.length > 0 ? Object.values(QAPairShown)[0] : 'No Question Left, please submit Questions below';
        const AnswerShown = this.state.QAPair.length > 0 ? Object.values(QAPairShown)[1] : '';
        const ShowAnswerButtonToggle = this.state.AnswerShown ? 'Hide Answer' : 'Show Answer';
        return (
            <PageContainer>
                <PageTitle>
                    <h1>Simple Study Flash Cards</h1>
                </PageTitle>
                <ContentContainer>
                    <QuestionAnswerContainer>
                        <QuestionAnswerDiv>
                            <QATitle>Questions</QATitle>
                            <QAContent>
                                <QuestionShow>{QuestionShown}</QuestionShow>
                                <NextQuestionButton onClick={this.randomize}>
                                    Next Question
                                </NextQuestionButton>
                            </QAContent>
                        </QuestionAnswerDiv>
                        <QuestionAnswerDiv>
                            <QATitle>Answers</QATitle>
                            <QAContent>
                                <AnswerTextDiv>
                                    <AnswerText show={this.state.AnswerShown}>{AnswerShown}</AnswerText>
                                </AnswerTextDiv>
                                <ShowAnswerButton show={this.state.AnswerShown}
                                                  onClick={this.showAnswer}>{ShowAnswerButtonToggle}
                                </ShowAnswerButton>
                            </QAContent>
                        </QuestionAnswerDiv>
                    </QuestionAnswerContainer>
                    <QuestionSubmission>
                        <QuestionSubmissionTitle>Question Submission</QuestionSubmissionTitle>
                        <QSubmissionForm onSubmit={this.handleSubmit}>
                            <QuestionSubmissionDiv>
                                <QAlabel> Enter Question: </QAlabel>
                                <QSubmissiontextarea value={this.state.TextAreaQuestion}
                                                     onChange={this.handleChangeQuestion}
                                                     rows="4"
                                                     cols="50"
                                                     id="questiosnText"
                                                     name="questionText"
                                                     wrap="hard">Question</QSubmissiontextarea>
                                <QAlabel> Enter Answer: </QAlabel>
                                <QSubmissiontextarea value={this.state.TextAreaAnswer}
                                                     onChange={this.handleChangeAnswer}
                                                     rows="4"
                                                     cols="50"
                                                     id="questionAnswer"
                                                     name="questionAnswer"
                                                     wrap="hard">Question</QSubmissiontextarea>
                            </QuestionSubmissionDiv>
                            <InputDiv>
                                <StyledInput type="submit"/>
                            </InputDiv>
                        </QSubmissionForm>
                        <div>
                            <QuestionBank>
                                <QuestionBankLabel>Question Bank</QuestionBankLabel>
                                {
                                    this.state.QAPair.map(QAPairs =>
                                        <QuestionDisplayed>
                                            <QuestionShowSpan>{QAPairs.Question}</QuestionShowSpan>
                                            <DeleteQuestionButton onClick={() => this.deleteQuestion(this.state.QAPair.findIndex(x => x.Question === QAPairs.Question))}>Delete
                                                Question</DeleteQuestionButton>
                                        </QuestionDisplayed>
                                    )}
                            </QuestionBank>
                        </div>
                    </QuestionSubmission>
                </ContentContainer>
            </PageContainer>
        );
    }

}

export default App;
