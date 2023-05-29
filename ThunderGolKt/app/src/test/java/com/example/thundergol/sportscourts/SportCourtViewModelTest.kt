package com.example.thundergol.sportscourts

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.compose.runtime.livedata.observeAsState
import androidx.lifecycle.Observer
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.domain.use_case.GetOneSportcourtUseCase
import com.example.thundergol.domain.use_case.GetSportCourtListUseCase
import com.example.thundergol.domain.utils.Resource
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import com.example.thundergol.presentation.sportscourts.SportCourtViewModel
import io.mockk.MockKAnnotations
import io.mockk.coEvery
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.verify
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOf

import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Assert
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.mockito.Mock
import kotlin.math.exp

@ExperimentalCoroutinesApi
class SportCourtViewModelTest {

    @RelaxedMockK
    private lateinit var getSportCourtListUseCase : GetSportCourtListUseCase
    @RelaxedMockK
    private lateinit var getOneSportcourtUseCase : GetOneSportcourtUseCase
    @RelaxedMockK
    private lateinit var sportCourtRepository : SportCourtRepositoryInterface
    lateinit var viewModel : SportCourtViewModel

    @get:Rule
    var rule: InstantTaskExecutorRule = InstantTaskExecutorRule()

//    @Mock lateinit var sportCourtListObserver : Observer<List<SportCourtDetail>>
    @Before
    fun setUp() {
        MockKAnnotations.init(this)
        viewModel = SportCourtViewModel(getSportCourtListUseCase)
        Dispatchers.setMain(Dispatchers.Unconfined)
    }

    @After
    fun onAfter() {
        Dispatchers.resetMain()
    }

    @Test
    fun `when the api  doesn't return anything then get empty list`() = runTest {

        //given
//        val expected = listOf(
//            async {
//                createDeferredSportCourtDetail(
//                    SportCourtModel(
//                        id = "fwefwefwe",
//                        width = 12,
//                        price = 14,
//                        sportCenterId = "dfgdshhghfj",
//                        name = "C1",
//                        photo = "qqqqqqqqqq",
//                        materialId = "qweggfdsvhrhreh234",
//                        long = 35,
//                        description = "des1"
//                    )
//                )
//            },
//            async {
//                createDeferredSportCourtDetail(
//                    SportCourtModel(
//                        id = "gergerger",
//                        width = 14,
//                        price = 85,
//                        sportCenterId = "qwriliñoilkjnh",
//                        name = "C2",
//                        photo = "wwwwwwwwwwwwwwww",
//                        materialId = "e12er4g5g45h",
//                        long = 32,
//                        description = "des2",
//                    )
//                )
//            },
//            async {
//                createDeferredSportCourtDetail(
//                    SportCourtModel(
//                        id = "peogpowrop",
//                        width = 14,
//                        price = 85,
//                        sportCenterId = "opwrvpowigpowei",
//                        name = "C2",
//                        photo = "iiiiiiiiiiiiiiii",
//                        materialId = "xocupwoejfef2",
//                        long = 32,
//                        description = "des3",
//                    )
//                )
//            }
//        )

        val expected = listOf(
            SportCourtDetail(
                id = "fwefwefwe",
                width = 12,
                price = 14,
                sportCenterId = "dfgdshhghfj",
                name = "C1",
                photo = "qqqqqqqqqq",
                materialId = "qweggfdsvhrhreh234",
                long = 35,
                description = "des1",
                materialName= "",
                sportCenterName = "",
            ), SportCourtDetail(
                id = "fwefwefwe",
                width = 12,
                price = 14,
                sportCenterId = "dfgdshhghfj",
                name = "C1",
                photo = "qqqqqqqqqq",
                materialId = "qweggfdsvhrhreh234",
                long = 35,
                description = "des1",
                materialName= "dqw",
                sportCenterName = "qwdqwd",
            ), SportCourtDetail(
                id = "fwefwefwe",
                width = 12,
                price = 14,
                sportCenterId = "dfgdshhghfj",
                name = "C1",
                photo = "qqqqqqqqqq",
                materialId = "qweggfdsvhrhreh234",
                long = 35,
                description = "des1",
                materialName= "dqw",
                sportCenterName = "qwdqwd",
            ), SportCourtDetail(
                id = "fwefwefwe",
                width = 12,
                price = 14,
                sportCenterId = "dfgdshhghfj",
                name = "C1",
                photo = "qqqqqqqqqq",
                materialId = "qweggfdsvhrhreh234",
                long = 35,
                description = "des1",
                materialName= "dqw",
                sportCenterName = "qwdqwd",
            )
        )

        //given
        coEvery { getSportCourtListUseCase() } returns flowOf(expected)

        //when
        viewModel.fetchSportsCourts()

        //then
        Assert.assertEquals(5,viewModel.sportsCourts.value!!.size)
    }

//
//    @Test
//    fun `when the api  does return anything then get list`() = runBlocking {
//
//        val list = listOf(
//            SportCourtDetail(
//                id = "",
//                width = 0,
//                price = 0,
//                sportCenterName = "",
//                sportCenterId = "",
//                name = "",
//                photo = "",
//                materialId = "",
//                long = 0,
//                description = "",
////                businessHours = "",
//                materialName = ""
//            )
//        )
//        //given
//        sportCourtRepository.fetchListSportCourt()
////        coEvery { getSportCourtListUseCase(firestoreResponse) } returns emptyList<List<SportCourtModel>>()
//        //when
//        viewModel.fetchSportsCourts()
//
//        //then
//        val size = viewModel.sportsCourts.value!!.size
//        Assert.assertEquals(1,size)
//    }

}
