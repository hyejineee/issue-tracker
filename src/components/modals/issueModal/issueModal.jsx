import { useState } from 'react'
import { Modal, message } from 'antd'
import useAddIssue from '../../../commons/hooks/issue/useAddIssue'
import useUpdateIssue from '../../../commons/hooks/issue/useUpdateIssue'
import TextInputWithLabel from '../../inputs/textInputWithLabel'
import TextAreaWithLabel from '../../inputs/textAreaWithLabel'
import * as S from './issueModal.style'
import SelectWithLabel from '../../inputs/selectWithLabel'
import DatePickerWithLabel from '../../inputs/datePickerWithLabel'
import debounce from '../../../commons/lib/debounce'

export default function IssueModal({ isEdit, status, defaultValue, onCancel }) {
  const { addIssue } = useAddIssue()
  const { updateIssue } = useUpdateIssue()
  const [messageApi, contextHolder] = message.useMessage()

  const [inputs, setInputs] = useState({
    sequence: defaultValue?.sequence || 0,
    title: defaultValue?.title || '',
    contents: defaultValue?.contents || '',
    status: defaultValue?.status || status || '',
    assignee: defaultValue?.addIssue || '',
    dueDate: defaultValue?.dueDate || '',
  })

  const messageOpen = (content) => {
    messageApi.open({
      type: 'error',
      content,
    })
  }

  const handleChangeInputs = (field, value) => {
    setInputs((p) => ({
      ...p,
      [field]: value,
    }))
  }

  const handleClickOk = debounce(() => {
    if (!inputs.title) {
      messageOpen('제목을 입력해 주세요.')
      return
    }

    if (!inputs.contents) {
      messageOpen('내용을 입력해 주세요.')
      return
    }

    if (!inputs.dueDate) {
      messageOpen('마감일을 입력해 주세요.')
      return
    }

    if (!inputs.status) {
      messageOpen('상태를 입력해 주세요.')
      return
    }

    if (!inputs.assignee) {
      messageOpen('담당자를 입력해 주세요.')
      return
    }

    isEdit ? updateIssue(inputs.sequence, inputs) : addIssue(inputs)
    onCancel()
  }, 1000)

  return (
    <>
      {contextHolder}
      <Modal open centered okText='저장' cancelText='취소' onOk={handleClickOk} onCancel={onCancel}>
        <S.Wrapper>
          <S.TitleWrapper>#{defaultValue?.sequence || ' Issue'}</S.TitleWrapper>
          <TextInputWithLabel
            label='제목'
            name='title'
            defaultValue={defaultValue?.title}
            placeholder={defaultValue === undefined ? '제목을 입력해 주세요.' : ''}
            maxLength={100}
            onChange={handleChangeInputs}
          />
          <SelectWithLabel
            label='상태'
            name='status'
            isSearch={false}
            defaultValue={defaultValue?.status || status}
            onChange={handleChangeInputs}
            options={[
              { value: 'todo', label: '할 일' },
              { value: 'ongoing', label: '진행 중' },
              { value: 'done', label: '완료' },
            ]}
          />
          <SelectWithLabel
            isSearch
            label='담당자'
            name='assignee'
            defaultValue={defaultValue?.assignee}
            placeholder={defaultValue === undefined ? '담당자를 지정해 주세요.' : ''}
            onChange={handleChangeInputs}
            options={[
              { value: '바흐흑', label: '바흐흑' },
              { value: '고흐흑', label: '고흐흑' },
              { value: '바하학', label: '바하학' },
            ]}
          />
          <DatePickerWithLabel
            label='마감일'
            name='dueDate'
            defaultValue={defaultValue?.dueDate}
            placeholder={defaultValue === undefined ? '마감일을 설정해 주세요.' : ''}
            onChange={handleChangeInputs}
          />
          <TextAreaWithLabel
            label='내용'
            name='contents'
            defaultValue={defaultValue?.contents}
            placeholder={defaultValue === undefined ? '내용을 입력해 주세요.' : ''}
            onChange={handleChangeInputs}
          />
        </S.Wrapper>
      </Modal>
    </>
  )
}
