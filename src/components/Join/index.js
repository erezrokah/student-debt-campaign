// @flow

import React, { useEffect } from 'react'
import * as ReachRouter from '@reach/router'
import _ from 'lodash'
import { navigate } from 'gatsby'
import { useMutation } from '@apollo/react-hooks'
import { ADD_USER_TO_CAMPAIGN, GET_USER } from '../../api'

const VALID_MOTIVES = [
  'already-on-strike',
  'threatening-on-strike',
  'solidarity-with-strikers'
]

type Props = {
  isLoggedIn: boolean
} & ReachRouter.RouteComponentProps<{ motive: string }>

const Join = ({ isLoggedIn, motive }: Props) => {
  const [joinCampaign] = useMutation(ADD_USER_TO_CAMPAIGN, {
    onCompleted: data => {
      navigate('/app/welcome')
    },
    refetchQueries: [
      {
        query: GET_USER
      }
    ]
  })

  useEffect(() => {
    // validate motive
    if (!_.includes(VALID_MOTIVES, motive)) {
      alert(`Sorry, motive "${motive}" is not valid.`)
      navigate('/')
      return
    }

    // redirect to login
    if (!isLoggedIn) {
      const { GATSBY_HOST_URL, GATSBY_COMMUNITY_URL } = process.env

      if (!GATSBY_HOST_URL || !GATSBY_COMMUNITY_URL) {
        console.error('Unable to redirect, missing env variables')
        return
      }

      const redirectUrl = `return_url=${GATSBY_HOST_URL}/app/join/${motive}`
      const loginSSOUrl = `${GATSBY_COMMUNITY_URL}/session/sso_cookies?${redirectUrl}`

      window.location = loginSSOUrl
      return
    }

    joinCampaign({
      variables: { motive }
    })
  }, [isLoggedIn, joinCampaign, motive])

  return <p>Joining campaign...</p>
}

export default Join
