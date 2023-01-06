import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { grabIssueState } from '../../commons/store/ui'
import useUpdateIssue from '../../commons/hooks/issue/useUpdateIssue'
import BoardUI from './board.presenter'

function BoardContainer() {
  const [issueModalState, setIssueModalState] = useState({
    visible: false,
    status: '',
    defaultValue: undefined,
  })

  const [grabIssue] = useRecoilState(grabIssueState)
  const { updateIssueOrderWhenDropAdded } = useUpdateIssue()

  const handleCloseIssueModal = () => {
    setIssueModalState({
      visible: false,
      status: undefined,
      defaultValue: undefined,
    })
  }

  const handleOpenIssueModal = (status, defaultValue) => {
    setIssueModalState({
      visible: true,
      status,
      defaultValue,
    })
  }

  const handleUpdateIssueStatus = (targetStatus) => {
    if (grabIssue.status === targetStatus) return

    updateIssueOrderWhenDropAdded(targetStatus, grabIssue.sequence, {
      ...grabIssue,
      status: targetStatus,
    })
  }

  return (
    <BoardUI
      issueModalState={issueModalState}
      handleOpenIssueModal={handleOpenIssueModal}
      handleCloseIssueModal={handleCloseIssueModal}
      handleUpdateIssueStatus={handleUpdateIssueStatus}
    />
  )
}

export default BoardContainer
