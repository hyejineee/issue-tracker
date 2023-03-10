import { Spin } from 'antd'
import { useRecoilState } from 'recoil'
import { loadingModalVisibleState } from '../../../commons/store/ui'
import * as S from './loadingModal.styles'

export default function LoadingModal() {
  const [isLoading] = useRecoilState(loadingModalVisibleState)

  return (
    <S.Wrapper visibility={isLoading ? 'visible' : 'hidden'}>
      <S.Contents>
        <Spin size='large' />
      </S.Contents>
    </S.Wrapper>
  )
}
